"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@repo/ui/components/ui/select";
import { Calendar, Search } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  doctor: z.string().min(1, {
    message: "Please select a doctor.",
  }),
  reason: z.string().min(1, {
    message: "Please provide a reason for the appointment.",
  }),
  additionalComments: z.string().optional(),
  appointmentDate: z.string().min(1, {
    message: "Please select an appointment date.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const doctors = [
  {
    id: "dr-adam-smith",
    name: "Dr. Adam Smith",
    initials: "AS",
  },
  {
    id: "dr-jane-doe",
    name: "Dr. Jane Doe",
    initials: "JD",
  },
  {
    id: "dr-michael-johnson",
    name: "Dr. Michael Johnson",
    initials: "MJ",
  },
  {
    id: "dr-sarah-williams",
    name: "Dr. Sarah Williams",
    initials: "SW",
  },
];

const AppointmentCreateForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctor: "",
      reason: "",
      additionalComments: "",
      appointmentDate: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    // Handle form submission here
  }

  const selectedDoctor = doctors.find(
    (doctor) => doctor.id === form.watch("doctor")
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-8 mt-6 md:mt-8"
      >
        {/* Doctor Selection */}
        <FormField
          control={form.control}
          name="doctor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Doctor</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full h-12 bg-background border-[#363A3D] text-white hover:bg-background/80">
                    <div className="flex items-center gap-3 w-full">
                      <Search className="h-4 w-4 text-[#ABB8C4] shrink-0" />
                      {selectedDoctor ? (
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                            {selectedDoctor.initials}
                          </div>
                          <span className="text-white truncate">
                            {selectedDoctor.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#ABB8C4]">
                          Search for a doctor
                        </span>
                      )}
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-background border-[#363A3D] text-white">
                    {doctors.map((doctor) => (
                      <SelectItem
                        key={doctor.id}
                        value={doctor.id}
                        className="text-white focus:bg-[#2A2D31] cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold">
                            {doctor.initials}
                          </div>
                          {doctor.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Reason and Additional Comments - Side by side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Reason for appointment
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="ex: Annual montly check-up"
                    className="min-h-[120px] bg-background border-[#363A3D] text-white placeholder:text-[#ABB8C4] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalComments"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Additional comments/notes
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="ex: Prefer afternoon appointments, if possible"
                    className="min-h-[120px] bg-background border-[#363A3D] text-white placeholder:text-[#ABB8C4] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Appointment Date */}
        <FormField
          control={form.control}
          name="appointmentDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Expected appointment date
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ABB8C4] pointer-events-none z-10" />
                  <Input
                    type="date"
                    className="pl-10 bg-background border-[#363A3D] text-white scheme-dark"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 font-medium rounded-md"
        >
          Submit and continue
        </Button>
      </form>
    </Form>
  );
};

export default AppointmentCreateForm;
