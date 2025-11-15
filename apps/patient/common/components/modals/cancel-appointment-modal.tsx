"use client"

import {
  Dialog,
  DialogContent,
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
import { Button } from "@repo/ui/components/ui/button"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { z } from "zod"

const formSchema = z.object({
  reason: z.string().min(1, {
    message: "Please provide a reason for cancellation.",
  }),
})

type FormValues = z.infer<typeof formSchema>

interface CancelAppointmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appointmentId?: number
}

export function CancelAppointmentModal({
  open,
  onOpenChange,
  appointmentId,
}: CancelAppointmentModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  })

  function onSubmit(values: FormValues) {
    console.log("Cancel appointment:", values, appointmentId)
    // Handle cancellation here
    // You can add API call here
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1D21] border-[#363A3D] text-white max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white">
            Cancel Appointment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Confirmation Message */}
          <p className="text-white text-sm sm:text-base">
            Are you sure you want to cancel your appointment
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Reason for cancellation */}
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white text-sm font-medium">
                      Reason for cancellation
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="ex: Urgent meeting came up"
                        className="min-h-[100px] bg-[#1A1D21] border-[#363A3D] text-white placeholder:text-[#ABB8C4] resize-none focus:ring-2 focus:ring-red-500/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md"
              >
                Cancel appointment
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

