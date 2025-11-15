"use client"

import Image from "next/image"
import { Check, Calendar } from "lucide-react"
import { Avatar } from "@repo/ui/components/ui/avatar"

interface AppointmentSuccessScreenProps {
  doctorName: string
  doctorInitials: string
  appointmentDate: string
  appointmentTime: string
}

export function AppointmentSuccessScreen({
  doctorName,
  doctorInitials,
  appointmentDate,
  appointmentTime,
}: AppointmentSuccessScreenProps) {
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

  const formattedDate = formatDate(appointmentDate)
  const formattedTime = formatTime(`${appointmentDate}T${appointmentTime}`)

  return (
    <div className="min-h-screen bg-[#131619] text-white flex flex-col">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-center border-b border-[#1A1D21]">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/images/logo.png"
            alt="wellConsult logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <h1 className="text-xl sm:text-2xl font-bold">wellConsult</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-2xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#24AE7C] flex items-center justify-center">
              <Check className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Your{" "}
              <span className="text-[#24AE7C]">appointment request</span> has been
              successfully submitted!
            </h1>
            <p className="text-sm sm:text-base text-[#ABB8C4]">
              We`ll be in touch shortly to confirm.
            </p>
          </div>

          {/* Separator */}
          <div className="border-t border-[#363A3D] my-6 sm:my-8"></div>

          {/* Appointment Details Section */}
          <div className="space-y-4 sm:space-y-6 text-left">
            <h2 className="text-sm sm:text-base text-[#ABB8C4] font-medium">
              Requested appointment details:
            </h2>

            {/* Details Container */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Doctor Info */}
              <div className="flex items-center gap-2 sm:gap-3 bg-[#1A1D21] border border-[#363A3D] rounded-full px-3 sm:px-4 py-2 sm:py-3">
                <Avatar
                  initials={doctorInitials}
                  className="bg-primary/20 text-white shrink-0"
                  size="sm"
                />
                <span className="text-sm sm:text-base text-white whitespace-nowrap">
                  {doctorName}
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
      </main>
    </div>
  )
}

