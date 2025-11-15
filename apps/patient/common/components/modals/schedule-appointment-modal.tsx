"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@repo/ui/components/ui/input"
import { Button } from "@repo/ui/components/ui/button"
import { Textarea } from "@repo/ui/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@repo/ui/components/ui/select"
import { Calendar, Search, Check } from "lucide-react"
import { z } from "zod"
import { Avatar } from "@repo/ui/components/ui/avatar"
// import Image from "next/image"

const formSchema = z.object({
  doctor: z.string().min(1, {
    message: "Please select a doctor.",
  }),
  reason: z.string().min(1, {
    message: "Please provide a reason for the appointment.",
  }),
  appointmentDate: z.string().min(1, {
    message: "Please select an appointment date.",
  }),
})

type FormValues = z.infer<typeof formSchema>

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
]

interface ScheduleAppointmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appointmentId?: number
}

export function ScheduleAppointmentModal({
  open,
  onOpenChange,
  appointmentId,
}: ScheduleAppointmentModalProps) {
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctor: "",
      reason: "",
      appointmentDate: "",
    },
  })

  function onSubmit(values: FormValues) {
    console.log("Schedule appointment:", values, appointmentId)
    // Handle form submission here
    // You can add API call here
    setSubmittedData(values)
    setShowSuccess(true)
  }

  const selectedDoctor = doctors.find(
    (doctor) => doctor.id === form.watch("doctor")
  )

  const handleClose = (open: boolean) => {
    if (!open) {
      setShowSuccess(false)
      form.reset()
      setSubmittedData(null)
    }
    onOpenChange(open)
  }

  // Format date for display (e.g., "23 June 2024")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  // Format time for display (e.g., "5:00 PM")
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  if (showSuccess && submittedData) {
    const successDoctor = doctors.find(
      (doctor) => doctor.id === submittedData.doctor
    )
    
    if (!successDoctor) return null

    const formattedDate = formatDate(submittedData.appointmentDate)
    // Default to 5:00 PM if no time is provided
    const defaultTime = "17:00"
    const formattedTime = formatTime(`${submittedData.appointmentDate}T${defaultTime}`)

    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="bg-[#131619] border-[#363A3D] text-white max-w-2xl p-0 overflow-hidden">
          <div className="px-6 sm:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2">
                {/* <Image
                  src="/assets/images/logo.png"
                  alt="wellConsult logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                /> */}
                <h1 className="text-xl sm:text-2xl font-bold">wellConsult</h1>
              </div>
            </div>

            {/* Success Content */}
            <div className="text-center space-y-6 sm:space-y-8">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#24AE7C] flex items-center justify-center">
                  <Check className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-2 sm:space-y-3">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  Your{" "}
                  <span className="text-[#24AE7C]">appointment request</span> has been
                  successfully submitted!
                </h2>
                <p className="text-sm sm:text-base text-[#ABB8C4]">
                  We`ll be in touch shortly to confirm.
                </p>
              </div>

              {/* Separator */}
              <div className="border-t border-[#363A3D] my-6 sm:my-8"></div>

              {/* Appointment Details Section */}
              <div className="space-y-4 sm:space-y-6 text-left">
                <h3 className="text-sm sm:text-base text-[#ABB8C4] font-medium">
                  Requested appointment details:
                </h3>

                {/* Details Container */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  {/* Doctor Info */}
                  <div className="flex items-center gap-2 sm:gap-3 bg-[#1A1D21] border border-[#363A3D] rounded-full px-3 sm:px-4 py-2 sm:py-3">
                    <Avatar
                      initials={successDoctor.initials}
                      className="bg-primary/20 text-white shrink-0"
                      size="sm"
                    />
                    <span className="text-sm sm:text-base text-white whitespace-nowrap">
                      {successDoctor.name}
                    </span>
                  </div>

                  {/* Date and Time */}
                  <div className="flex items-center gap-2 sm:gap-3 text-white">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#ABB8C4] shrink-0" />
                    <span className="text-sm sm:text-base whitespace-nowrap">
                      {formattedDate} - {formattedTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1D21] border-[#363A3D] text-white max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white">
            Schedule Appointment
          </DialogTitle>
          <DialogDescription className="text-[#ABB8C4] text-sm pt-1">
            Please fill in the following details to schedule
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Doctor Selection */}
            <FormField
              control={form.control}
              name="doctor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm font-medium">
                    Doctor
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full h-12 bg-[#1A1D21] border-[#363A3D] text-white hover:bg-[#1A1D21]/80 hover:border-[#363A3D] focus:ring-2 focus:ring-[#24AE7C]/20">
                        <div className="flex items-center gap-3 w-full">
                          <Search className="h-4 w-4 text-[#ABB8C4] shrink-0" />
                          {selectedDoctor ? (
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <Avatar
                                initials={selectedDoctor.initials}
                                className="bg-primary/20 text-white size-6 text-xs shrink-0"
                                size="sm"
                              />
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
                      <SelectContent className="bg-[#1A1D21] border-[#363A3D] text-white">
                        {doctors.map((doctor) => (
                          <SelectItem
                            key={doctor.id}
                            value={doctor.id}
                            className="text-white focus:bg-[#2A2D31] cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar
                                initials={doctor.initials}
                                className="bg-primary/20 text-white size-6 text-xs"
                                size="sm"
                              />
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

            {/* Reason for appointment */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm font-medium">
                    Reason for appointment
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ex: Annual montly check-up"
                      className="min-h-[100px] bg-[#1A1D21] border-[#363A3D] text-white placeholder:text-[#ABB8C4] resize-none focus:ring-2 focus:ring-[#24AE7C]/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Expected appointment date */}
            <FormField
              control={form.control}
              name="appointmentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm font-medium">
                    Expected appointment date
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#ABB8C4] pointer-events-none z-10" />
                      <Input
                        type="date"
                        className="pl-10 h-12 bg-[#1A1D21] border-[#363A3D] text-white placeholder:text-[#ABB8C4] focus:ring-2 focus:ring-[#24AE7C]/20"
                        placeholder="Select your appointment date"
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
              className="w-full h-12 bg-[#24AE7C] hover:bg-[#24AE7C]/90 text-white font-medium rounded-md"
            >
              Schedule appointment
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

