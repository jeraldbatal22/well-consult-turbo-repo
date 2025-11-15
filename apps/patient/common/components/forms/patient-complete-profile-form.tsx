"use client";
import "react-phone-number-input/style.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group";
import PhoneInput from "react-phone-number-input";
import { Mail, Phone, Calendar, Upload } from "lucide-react";
import { z } from "zod";
import Image from "next/image";
import { cn } from "@repo/ui/lib/utils";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.email({
    message: "Invalid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  dateOfBirth: z.string().min(1, {
    message: "Date of birth is required.",
  }),
  gender: z
    .string()
    .refine((val) => ["male", "female", "other"].includes(val), {
      message: "Please select a gender.",
    }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  occupation: z.string().min(2, {
    message: "Occupation must be at least 2 characters.",
  }),
  emergencyContactName: z.string().min(2, {
    message: "Emergency contact name must be at least 2 characters.",
  }),
  emergencyPhoneNumber: z.string().min(10, {
    message: "Emergency phone number must be at least 10 characters.",
  }),
  primaryCarePhysician: z.string().min(1, {
    message: "Primary care physician is required.",
  }),
  insuranceProvider: z.string().min(2, {
    message: "Insurance provider must be at least 2 characters.",
  }),
  insurancePolicyNumber: z.string().min(2, {
    message: "Insurance policy number must be at least 2 characters.",
  }),
  allergies: z.string().optional(),
  currentMedications: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().min(1, {
    message: "Identification type is required.",
  }),
  identificationNumber: z.string().min(2, {
    message: "Identification number must be at least 2 characters.",
  }),
  identificationDocument: z.instanceof(File).optional(),
  consentTreatment: z.boolean().refine((val) => val === true, {
    message: "You must consent to receive treatment.",
  }),
  consentHealthInfo: z.boolean().optional(),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the privacy policy.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const PatientCompleteProfileForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "male",
      address: "",
      occupation: "",
      emergencyContactName: "",
      emergencyPhoneNumber: "",
      primaryCarePhysician: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      allergies: "",
      currentMedications: "",
      familyMedicalHistory: "",
      pastMedicalHistory: "",
      identificationType: "",
      identificationNumber: "",
      consentTreatment: false,
      consentHealthInfo: false,
      privacyPolicy: false,
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 md:space-y-10 mt-6 md:mt-8"
      >
        {/* Personal Information Section */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-lg md:text-xl font-bold">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Adam" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ABB8C4]" />
                      <Input
                        placeholder="ex: adrian@jsmastery.pro"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ABB8C4] z-10 pointer-events-none" />
                      <PhoneInput
                        defaultCountry="PH"
                        withCountryCallingCode
                        placeholder="+00 0342 0453 34"
                        international
                        className={cn(
                          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-12 w-full min-w-0 rounded-md bg-[#1A1D21] px-3 py-1 pl-10 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 border border-[#363A3D] file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                        )}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ABB8C4] pointer-events-none" />
                      <Input type="date" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-row gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <label
                          htmlFor="male"
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          Male
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <label
                          htmlFor="female"
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          Female
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <label
                          htmlFor="other"
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          Other
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: 14 street, New York, NY - 5101"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency contact name</FormLabel>
                  <FormControl>
                    <Input placeholder="Guardian's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyPhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Phone number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ABB8C4] z-10 pointer-events-none" />
                      <PhoneInput
                        defaultCountry="PH"
                        withCountryCallingCode
                        international
                        className={cn(
                          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-12 w-full min-w-0 rounded-md bg-[#1A1D21] px-3 py-1 pl-10 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 border border-[#363A3D] file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                        )}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Medical Information Section */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-lg md:text-xl font-bold">Medical Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <FormField
              control={form.control}
              name="primaryCarePhysician"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary care physician</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full h-12 bg-[#1A1D21] border-[#363A3D]">
                        <SelectValue placeholder="Select a physician" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1A1D21] border-[#363A3D] text-white">
                      <SelectItem
                        value="dr-adam-smith"
                        className="text-white focus:bg-[#2A2D31]"
                      >
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">
                            AS
                          </div>
                          Dr. Adam Smith
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="dr-jane-doe"
                        className="text-white focus:bg-[#2A2D31]"
                      >
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">
                            JD
                          </div>
                          Dr. Jane Doe
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insuranceProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance provider</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: BlueCross" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insurancePolicyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance policy number</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: ABC1234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies (if any)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ex: Peanuts, Penicillin, Pollen"
                      className="min-h-[100px] bg-[#1A1D21] border-[#363A3D]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentMedications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current medications</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
                      className="min-h-[100px] bg-[#1A1D21] border-[#363A3D]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyMedicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family medical history (if relevant)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ex: Mother had breast cancer"
                      className="min-h-[100px] bg-[#1A1D21] border-[#363A3D]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pastMedicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Past medical history</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ex: Asthma diagnosis in childhood"
                      className="min-h-[100px] bg-[#1A1D21] border-[#363A3D]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Identification and Verification Section */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-lg md:text-xl font-bold">
            Identification and Verification
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <FormField
              control={form.control}
              name="identificationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identification type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full h-12 bg-[#1A1D21] border-[#363A3D]">
                        <SelectValue placeholder="Select identification type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1A1D21] border-[#363A3D] text-white">
                      <SelectItem
                        value="birth-certificate"
                        className="text-white focus:bg-[#2A2D31]"
                      >
                        Birth Certificate
                      </SelectItem>
                      <SelectItem
                        value="passport"
                        className="text-white focus:bg-[#2A2D31]"
                      >
                        Passport
                      </SelectItem>
                      <SelectItem
                        value="driver-license"
                        className="text-white focus:bg-[#2A2D31]"
                      >
                        Driver&apos;s License
                      </SelectItem>
                      <SelectItem
                        value="national-id"
                        className="text-white focus:bg-[#2A2D31]"
                      >
                        National ID
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="identificationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identification Number</FormLabel>
                  <FormControl>
                    <Input placeholder="ex 1234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="identificationDocument"
              render={({ field: { value, onChange, ...field } }) => {
                return (
                  <FormItem className="md:col-span-2">
                    <FormLabel>
                      Scanned Copy of Identification Document
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          id="file-upload"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                            }
                          }}
                          {...field}
                        />
                        <label
                          htmlFor="file-upload"
                          className="relative flex flex-col items-center justify-center w-full h-40 md:h-48 border-2 border-dashed border-[#363A3D] rounded-md cursor-pointer bg-[#1A1D21] hover:bg-[#1f2326] transition-colors"
                        >
                          {value && (
                            <Image
                              src={URL.createObjectURL(value)}
                              fill
                              alt={value.name}
                              className=" object-cover"
                            />
                          )}
                          <Upload className="h-10 w-10 text-[#ABB8C4] mb-2" />
                          <p className="text-sm text-white mb-1">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-[#ABB8C4]">
                            SVG, PNG, JPG or GIF (max. 800x400px)
                          </p>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>

        {/* Consent and Privacy Section */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-lg md:text-xl font-bold">Consent and Privacy</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="consentTreatment"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal cursor-pointer">
                      I consent to receive treatment for my health condition.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consentHealthInfo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal cursor-pointer">
                      I consent to the use and disclosure of my health
                      information for treatment purposes.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privacyPolicy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal cursor-pointer">
                      I acknowledge that I have reviewed and agree to the
                      privacy policy
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-[#24AE7C] hover:bg-[#24AE7C]/90 text-white font-medium rounded-md"
        >
          Submit and continue
        </Button>
      </form>
    </Form>
  );
};

export default PatientCompleteProfileForm;
