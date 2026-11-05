import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
        const response = await fetch("https://formspree.io/f/xoealwwk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            subject: values.subject === "Others" ? values.otherSubject : values.subject,
            message: values.message,
            "g-recaptcha-response": values.recaptchaToken
          })
        });

        if (response.ok) {
          alert("Success! Your message has been sent to BiiXoft successfully.");
          recaptchaRef.current?.reset();
          resetForm();
        } else {
          const errorData = await response.json();
          console.error("Formspree processing error details:", errorData);
          alert("Oops! There was a problem submitting your form. Please try again.");
        }
      } catch (error) {
        console.error("Form submittal network transmission exception handler error logged:", error);
        alert("A connectivity problem occurred. Please check your connection and try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-card border border-border p-6 sm:p-10 rounded-3xl shadow-xl max-w-xl mx-auto w-full box-border text-left">
      <h3 className="text-2xl font-black text-foreground text-center mb-2">Start Your Project</h3>
      <p className="text-muted-foreground text-center text-xs sm:text-sm mb-8">Send us your operational requirements to kickstart your custom digital upgrade.</p>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        
        {/* FULL NAME */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Full Name</label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`w-full bg-background border border-border text-foreground placeholder-muted-foreground focus-visible:ring-primary h-11 transition-all ${
              formik.touched.name && formik.errors.name ? 'border-destructive focus-visible:ring-destructive' : ''
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-destructive text-xs mt-1.5 font-semibold">{formik.errors.name}</p>
          )}
        </div>

        {/* EMAIL ADDRESS */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Email Address</label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`w-full bg-background border border-border text-foreground placeholder-muted-foreground focus-visible:ring-primary h-11 transition-all ${
              formik.touched.email && formik.errors.email ? 'border-destructive focus-visible:ring-destructive' : ''
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-destructive text-xs mt-1.5 font-semibold">{formik.errors.email}</p>
          )}
        </div>

        {/* SUBJECT SELECTION DROP-DOWN */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Subject</label>
          <select
            id="subject"
            name="subject"
            onChange={(e) => {
              formik.handleChange(e);
              if (e.target.value !== 'Others') {
                formik.setFieldValue('otherSubject', '');
              }
            }}
            onBlur={formik.handleBlur}
            value={formik.values.subject}
            className={`w-full bg-background border border-border text-foreground rounded-lg px-3 h-11 text-sm outline-none font-medium transition-all focus:border-primary cursor-pointer ${
              formik.touched.subject && formik.errors.subject ? 'border-destructive' : ''
            }`}
          >
            <option value="" disabled hidden className="bg-card text-muted-foreground">Select an option...</option>
            <option value="Discuss Projects" className="bg-card text-foreground">Discuss Projects</option>
            <option value="Send Review / Testimony" className="bg-card text-foreground">Send Review / Testimony</option>
            <option value="General Enquiries" className="bg-card text-foreground">General Enquiry</option>
            <option value="Others" className="bg-card text-foreground">Others</option>
          </select>
          {formik.touched.subject && formik.errors.subject && (
            <p className="text-destructive text-xs mt-1.5 font-semibold">{formik.errors.subject}</p>
          )}
        </div>

        {/* CONDITIONAL FIELD */}
        {formik.values.subject === 'Others' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Specify Custom Subject</label>
            <Input
              id="otherSubject"
              name="otherSubject"
              type="text"
              placeholder="Please type your inquiry topic here..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.otherSubject}
              className={`w-full bg-background border border-border text-foreground placeholder-muted-foreground focus-visible:ring-primary h-11 transition-all ${
                formik.touched.otherSubject && formik.errors.otherSubject ? 'border-destructive focus-visible:ring-destructive' : ''
              }`}
            />
            {formik.touched.otherSubject && formik.errors.otherSubject && (
              <p className="text-destructive text-xs mt-1.5 font-semibold">{formik.errors.otherSubject}</p>
            )}
          </div>
        )}

        {/* PROJECT BRIEF TEXTAREA */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Project Brief</label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us about the website or system architecture you need built..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className={`w-full bg-background border border-border text-foreground placeholder-muted-foreground focus-visible:ring-primary text-sm resize-none transition-all ${
              formik.touched.message && formik.errors.message ? 'border-destructive focus-visible:ring-destructive' : ''
            }`}
          />
          {formik.touched.message && formik.errors.message && (
            <p className="text-destructive text-xs mt-1.5 font-semibold">{formik.errors.message}</p>
          )}
        </div>

        {/* 🔐 GOOGLE reCAPTCHA SECURITY MODULE */}
        <div className="flex justify-center py-2 overflow-x-auto">
          <div className="scale-[0.90] xs:scale-[0.85] sm:scale-100 origin-center transition-transform duration-200">
            <ReCAPTCHA
              ref={recaptchaRef}
              // ✅ Ensure 'sitekey' is spelled in lowercase with your valid token string inside quotes
              sitekey="6LdnVwwuAAAAAEdwQOKygvo8IaiP5mQ3pyu0VTlT"
              theme="dark"
              onChange={(token) => {
                formik.setFieldValue('recaptchaToken', token || '');
                formik.setFieldTouched('recaptchaToken', true, false);
              }}
              onExpired={() => formik.setFieldValue('recaptchaToken', '')}
            />

          </div>
        </div>
        {formik.touched.recaptchaToken && formik.errors.recaptchaToken && (
          <p className="text-destructive text-xs text-center font-semibold">{formik.errors.recaptchaToken}</p>
        )}

               {/* TRANSMIT BUTTON */}
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 rounded-xl transition text-sm disabled:opacity-50 border-none shadow-md shadow-primary/10"
        >
          {formik.isSubmitting ? 'Verifying & Processing...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
