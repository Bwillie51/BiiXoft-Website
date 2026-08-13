import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Bulletproof validation schema with Yup
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short!')
    .max(50, 'Name is too long!')
    .required('Please enter your full name'),
  email: Yup.string()
    .email('Invalid email address format')
    .required('Please enter your email address'),
  subject: Yup.string()
    .required('Please select a subject category'),
  // Validation applies dynamically only if "Others" option is actively selected
  otherSubject: Yup.string().when('subject', {
    is: 'Others',
    then: () => Yup.string().min(3, 'Please specify your subject').required('Please enter your custom subject'),
    otherwise: () => Yup.string().notRequired(),
  }),
  message: Yup.string()
    .min(10, 'Please tell us more about your project (min 10 characters)')
    .required('Project brief or message description is required'),
  recaptchaToken: Yup.string()
    .required('Please complete the security reCAPTCHA check to verify you are human'),
});

export default function ContactForm() {
  const recaptchaRef = useRef(null);

  const formik = useFormik({
    initialValues: { 
      name: '', 
      email: '', 
      subject: '', 
      otherSubject: '', 
      message: '', 
      recaptchaToken: '' 
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        // Log local verified payload structure to terminal prior to future Formspree pipe execution
        console.log("Verified Formik Form payload data package ready for submission:", values);
        
        alert("Success! Form validation passed, reCAPTCHA verified, payload package ready to integrate with Formspree.");
        
        // Reset state loops cleanly
        recaptchaRef.current?.reset();
        resetForm();
      } catch (error) {
        console.error("Form submittal exception handler error logged:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white border border-slate-200/80 p-6 sm:p-10 rounded-3xl shadow-xl max-w-xl mx-auto w-full box-border">
      <h3 className="text-2xl font-black text-slate-900 text-center mb-2">Start Your Project</h3>
      <p className="text-slate-500 text-center text-xs sm:text-sm mb-8">Send us your operational requirements to kickstart your custom digital upgrade.</p>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        
        {/* FULL NAME */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus-visible:ring-blue-600 h-11 focus-visible:bg-white ${
              formik.touched.name && formik.errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs mt-1.5 font-semibold">{formik.errors.name}</p>
          )}
        </div>

        {/* EMAIL ADDRESS */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus-visible:ring-blue-600 h-11 focus-visible:bg-white ${
              formik.touched.email && formik.errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1.5 font-semibold">{formik.errors.email}</p>
          )}
        </div>

        {/* SUBJECT SELECTION DROP-DOWN */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Subject</label>
          <select
            id="subject"
            name="subject"
            onChange={(e) => {
              formik.handleChange(e);
              // Clear the custom input if the user changes away from 'Others'
              if (e.target.value !== 'Others') {
                formik.setFieldValue('otherSubject', '');
              }
            }}
            onBlur={formik.handleBlur}
            value={formik.values.subject}
            className={`w-full bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:bg-white rounded-lg px-3 h-11 text-sm outline-none font-medium transition-all cursor-pointer ${
              formik.touched.subject && formik.errors.subject ? 'border-red-500' : ''
            }`}
          >
            <option value="" disabled hidden>Select an option...</option>
            <option value="Discuss Projects">Discuss Projects</option>
            <option value="Send Review / Testimony">Send Review / Testimony</option>
            <option value="General Enquiries">General Enquiry</option>
            <option value="Others">Others</option>
          </select>
          {formik.touched.subject && formik.errors.subject && (
            <p className="text-red-500 text-xs mt-1.5 font-semibold">{formik.errors.subject}</p>
          )}
        </div>

        {/* CONDITIONAL FIELD: Displays smoothly only when 'Others' dropdown selection object is active */}
        {formik.values.subject === 'Others' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Specify Custom Subject</label>
            <Input
              id="otherSubject"
              name="otherSubject"
              type="text"
              placeholder="Please type your inquiry topic here..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.otherSubject}
              className={`w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus-visible:ring-blue-600 h-11 focus-visible:bg-white ${
                formik.touched.otherSubject && formik.errors.otherSubject ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
            />
            {formik.touched.otherSubject && formik.errors.otherSubject && (
              <p className="text-red-500 text-xs mt-1.5 font-semibold">{formik.errors.otherSubject}</p>
            )}
          </div>
        )}

        {/* PROJECT BRIEF TEXTAREA */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Project Brief</label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us about the website or system architecture you need built..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className={`w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus-visible:ring-blue-600 text-sm resize-none focus-visible:bg-white ${
              formik.touched.message && formik.errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''
            }`}
          />
          {formik.touched.message && formik.errors.message && (
            <p className="text-red-500 text-xs mt-1.5 font-semibold">{formik.errors.message}</p>
          )}
        </div>

        {/* 🔐 GOOGLE reCAPTCHA SECURITY MODULE */}
        <div className="flex justify-center py-2 overflow-x-auto">
          <ReCAPTCHA
            ref={recaptchaRef}
            // Replace with your real Google reCAPTCHA v2 checkbox site key when ready
            sitekey="6LfTfIMtAAAAANLaeIjTgXCXLuwNHjq4MjUviXSq" 
            onChange={(token) => formik.setFieldValue('recaptchaToken', token || '')}
            onExpired={() => formik.setFieldValue('recaptchaToken', '')}
          />
        </div>
        {formik.touched.recaptchaToken && formik.errors.recaptchaToken && (
          <p className="text-red-500 text-xs text-center font-semibold">{formik.errors.recaptchaToken}</p>
        )}

        {/* TRANSMIT BUTTON */}
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-xl transition text-sm disabled:opacity-50 border-none shadow-md shadow-blue-600/10"
        >
          {formik.isSubmitting ? 'Verifying & Processing...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
}
