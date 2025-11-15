"use client"

// import { useState } from "react"
// import Image from "next/image"
import { CalendarCheck, Clock, AlertTriangle, Check, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table"
import { Button } from "@repo/ui/components/ui/button"
// import { ScheduleAppointmentModal } from "@/common/components/modals/schedule-appointment-modal"
// import { CancelAppointmentModal } from "@/common/components/modals/cancel-appointment-modal"
import { Avatar } from "@repo/ui/components/ui/avatar"

// Mock data - replace with actual data from your API/state
const stats = {
  scheduled: 94,
  pending: 32,
  cancelled: 56,
}

const appointments = [
  {
    id: 1,
    patient: { name: "Phoenix Baker", initials: "PB", color: "bg-green-600", textColor: "text-green-300" },
    date: "Jan 4, 2022",
    status: "Scheduled",
    statusColor: "text-green-500",
    doctor: { name: "Dr. Alex Ramirez", initials: "AR", avatar: "/assets/images/doctor-1.jpg" },
  },
  {
    id: 2,
    patient: { name: "Candice Wu", initials: "CW", color: "bg-blue-600", textColor: "text-blue-300" },
    date: "Jan 2, 2022",
    status: "Pending",
    statusColor: "text-blue-500",
    doctor: { name: "Dr. Michael May", initials: "MM", color: "bg-gray-600", textColor: "text-white" },
  },
  {
    id: 3,
    patient: { name: "Lana Steiner", initials: "LS", color: "bg-blue-600", textColor: "text-blue-300" },
    date: "Jan 4, 2022",
    status: "Cancelled",
    statusColor: "text-red-500",
    doctor: { name: "Dr. Jasmine Lee", initials: "JL", avatar: "/assets/images/doctor-2.jpg" },
  },
  {
    id: 4,
    patient: { name: "Drew Cano", initials: "DC", color: "bg-green-600", textColor: "text-green-300" },
    date: "Jan 8, 2022",
    status: "Scheduled",
    statusColor: "text-green-500",
    doctor: { name: "Dr. Hardik Sharma", initials: "HS", avatar: "/assets/images/doctor-3.jpg" },
  },
  {
    id: 5,
    patient: { name: "Natali Craig", initials: "NC", color: "bg-purple-600", textColor: "text-purple-300" },
    date: "Jan 6, 2022",
    status: "Pending",
    statusColor: "text-blue-500",
    doctor: { name: "Dr. Alyana Cruz", initials: "AC", avatar: "/assets/images/doctor-4.jpg" },
  },
]

const AppointmentsPage = () => {
  // const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  // const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  // const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | undefined>(undefined)

  // const handleScheduleClick = (appointmentId: number) => {
  //   setSelectedAppointmentId(appointmentId)
  //   setIsScheduleModalOpen(true)
  // }

  // const handleCancelClick = (appointmentId: number) => {
  //   setSelectedAppointmentId(appointmentId)
  //   setIsCancelModalOpen(true)
  // }

  return (
    <div className="min-h-screen bg-[#131619] text-white">
      {/* <ScheduleAppointmentModal
        open={isScheduleModalOpen}
        onOpenChange={setIsScheduleModalOpen}
        appointmentId={selectedAppointmentId}
      />
      <CancelAppointmentModal
        open={isCancelModalOpen}
        onOpenChange={setIsCancelModalOpen}
        appointmentId={selectedAppointmentId}
      /> */}
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between border-b border-[#1A1D21]">
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
        <div className="flex items-center gap-2 sm:gap-3">
          <Avatar
            initials="A"
            className="bg-[#24AE7C] text-white"
            size="sm"
          />
          <span className="text-sm sm:text-base font-medium">Admin</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
            Welcome, Admin
          </h1>
          <p className="text-sm sm:text-base text-[#ABB8C4]">
            Start day with managing new appointments.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
          {/* Scheduled Appointments Card */}
          <div className="bg-[#1A1D21] rounded-lg p-4 sm:p-6 border border-[#363A3D]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-yellow-500/20 rounded-lg">
                <CalendarCheck className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-yellow-500">{stats.scheduled}</p>
              <p className="text-xs sm:text-sm text-[#ABB8C4]">
                Total number of scheduled appointments
              </p>
            </div>
          </div>

          {/* Pending Appointments Card */}
          <div className="bg-[#1A1D21] rounded-lg p-4 sm:p-6 border border-[#363A3D]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-blue-500/20 rounded-lg">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-blue-500">{stats.pending}</p>
              <p className="text-xs sm:text-sm text-[#ABB8C4]">
                Total number of pending appointments
              </p>
            </div>
          </div>

          {/* Cancelled Appointments Card */}
          <div className="bg-[#1A1D21] rounded-lg p-4 sm:p-6 border border-[#363A3D] sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-red-500/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-red-500">{stats.cancelled}</p>
              <p className="text-xs sm:text-sm text-[#ABB8C4]">
                Total number of cancelled appointments
              </p>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-[#1A1D21] rounded-lg border border-[#363A3D] overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[640px] sm:min-w-full">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#363A3D] hover:bg-transparent">
                    <TableHead className="text-white font-medium min-w-[150px]">Patient</TableHead>
                    <TableHead className="text-white font-medium min-w-[100px]">Date</TableHead>
                    <TableHead className="text-white font-medium min-w-[120px]">Status</TableHead>
                    <TableHead className="text-white font-medium min-w-[150px]">Doctor</TableHead>
                    <TableHead className="text-white font-medium min-w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id} className="border-[#363A3D] hover:bg-[#1f2326]">
                    <TableCell className="min-w-[150px]">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Avatar
                          initials={appointment.patient.initials}
                          className={`${appointment.patient.color} ${appointment.patient.textColor}`}
                          size="sm"
                        />
                        <span className="text-sm sm:text-base text-white whitespace-nowrap">
                          {appointment.patient.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="min-w-[100px]">
                      <span className="text-sm sm:text-base text-[#ABB8C4] whitespace-nowrap">
                        {appointment.date}
                      </span>
                    </TableCell>
                    <TableCell className="min-w-[120px]">
                      <div className="flex items-center gap-2">
                        {appointment.status === "Scheduled" && (
                          <Check className="h-4 w-4 text-green-500 shrink-0" />
                        )}
                        {appointment.status === "Pending" && (
                          <Clock className="h-4 w-4 text-blue-500 shrink-0" />
                        )}
                        {appointment.status === "Cancelled" && (
                          <X className="h-4 w-4 text-red-500 shrink-0" />
                        )}
                        <span className={`text-sm sm:text-base ${appointment.statusColor} whitespace-nowrap`}>
                          {appointment.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="min-w-[150px]">
                      <div className="flex items-center gap-2 sm:gap-3">
                        {appointment.doctor.avatar ? (
                          <Avatar
                            src={appointment.doctor.avatar}
                            alt={appointment.doctor.name}
                            size="sm"
                            className="bg-gray-600 shrink-0"
                          />
                        ) : (
                          <Avatar
                            initials={appointment.doctor.initials}
                            className={`${appointment.doctor.color || "bg-gray-600"} ${appointment.doctor.textColor || "text-white"} shrink-0`}
                            size="sm"
                          />
                        )}
                        <span className="text-sm sm:text-base text-white whitespace-nowrap">
                          {appointment.doctor.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="min-w-[120px]">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          // onClick={() => handleScheduleClick(appointment.id)}
                          className="text-green-500 hover:text-green-400 hover:bg-green-500/10 h-auto p-0 text-xs sm:text-sm whitespace-nowrap"
                        >
                          Schedule
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          // onClick={() => handleCancelClick(appointment.id)}
                          className="text-[#ABB8C4] hover:text-white hover:bg-transparent h-auto p-0 text-xs sm:text-sm whitespace-nowrap"
                        >
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </div>

          {/* Pagination */}
          <div className="px-4 sm:px-6 py-4 border-t border-[#363A3D] flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#ABB8C4] hover:text-white hover:bg-transparent disabled:opacity-50"
              disabled
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-transparent"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AppointmentsPage
