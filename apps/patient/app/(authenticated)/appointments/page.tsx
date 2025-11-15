"use client";

import { useState } from "react";
import {
  CalendarCheck,
  Clock,
  AlertTriangle,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { Button } from "@repo/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { ScheduleAppointmentModal } from "@/common/components/modals/schedule-appointment-modal";
import { CancelAppointmentModal } from "@/common/components/modals/cancel-appointment-modal";
import { Avatar } from "@repo/ui/components/ui/avatar";
import { useRouter } from "next/navigation";

// Updated mock data for stats - replace with actual data from your API/state
const stats = {
  upcoming: 6,
  missed: 2,
  completed: 8,
  cancelled: 2,
};

// Updated appointments data to reflect a more realistic patient view
const appointments = [
  {
    id: 101,
    patient: {
      name: "You",
      initials: "JD",
      color: "bg-primary",
      textColor: "text-foreground",
    },
    date: "Jul 18, 2024",
    status: "completed",
    statusColor: "text-green-500",
    doctor: {
      name: "Dr. Adam Smith",
      initials: "AS",
      avatar: "/assets/images/doctor-1.jpg",
    },
  },
  {
    id: 102,
    patient: {
      name: "You",
      initials: "JD",
      color: "bg-primary",
      textColor: "text-foreground",
    },
    date: "Aug 15, 2024",
    status: "upcoming",
    statusColor: "text-blue-500",
    doctor: {
      name: "Dr. Jane Doe",
      initials: "JD",
      avatar: "/assets/images/doctor-2.jpg",
    },
  },
  {
    id: 103,
    patient: {
      name: "You",
      initials: "JD",
      color: "bg-primary",
      textColor: "text-foreground",
    },
    date: "Jun 23, 2024",
    status: "cancelled",
    statusColor: "text-red-500",
    doctor: {
      name: "Dr. Sarah Williams",
      initials: "SW",
      avatar: "/assets/images/doctor-3.jpg",
    },
  },
  {
    id: 104,
    patient: {
      name: "You",
      initials: "JD",
      color: "bg-primary",
      textColor: "text-foreground",
    },
    date: "Jun 8, 2024",
    status: "completed",
    statusColor: "text-green-500",
    doctor: {
      name: "Dr. Michael Johnson",
      initials: "MJ",
      avatar: "/assets/images/doctor-4.jpg",
    },
  },
  {
    id: 105,
    patient: {
      name: "You",
      initials: "JD",
      color: "bg-primary",
      textColor: "text-foreground",
    },
    date: "May 30, 2024",
    status: "completed",
    statusColor: "text-green-500",
    doctor: {
      name: "Dr. Alyana Cruz",
      initials: "AC",
      avatar: "/assets/images/doctor-5.jpg",
    },
  },
  {
    id: 106,
    patient: {
      name: "You",
      initials: "JD",
      color: "bg-primary",
      textColor: "text-foreground",
    },
    date: "Aug 20, 2024",
    status: "upcoming",
    statusColor: "text-blue-500",
    doctor: {
      name: "Dr. Jane Doe",
      initials: "JD",
      avatar: "/assets/images/doctor-2.jpg",
    },
  },
  {
    id: 107,
    patient: {
      name: "You",
      initials: "JD",
      color: "bg-primary",
      textColor: "text-foreground",
    },
    date: "Jun 5, 2024",
    status: "missed",
    statusColor: "text-orange-500",
    doctor: {
      name: "Dr. Robert Lee",
      initials: "RL",
      avatar: "/assets/images/doctor-6.jpg",
    },
  },
  {
    id: 108,
    patient: {
      name: "You",
      initials: "JD",
      color: "bg-primary",
      textColor: "text-foreground",
    },
    date: "May 15, 2024",
    status: "missed",
    statusColor: "text-orange-500",
    doctor: {
      name: "Dr. Emily Chen",
      initials: "EC",
      avatar: "/assets/images/doctor-7.jpg",
    },
  },
];

type AppointmentStatus =
  | "all"
  | "upcoming"
  | "missed"
  | "completed"
  | "cancelled";

const AppointmentsPage = () => {
  const router = useRouter();

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    number | undefined
  >(undefined);
  const [filterStatus, setFilterStatus] = useState<AppointmentStatus>("all");

  // Filter appointments based on selected status
  const filteredAppointments = appointments.filter((appointment) => {
    if (filterStatus === "all") return true;
    return appointment.status.toLowerCase() === filterStatus.toLowerCase();
  });

  // const handleScheduleClick = (appointmentId: number) => {
  //   setSelectedAppointmentId(appointmentId);
  //   setIsScheduleModalOpen(true);
  // };

  const handleCancelClick = (appointmentId: number) => {
    setSelectedAppointmentId(appointmentId);
    setIsCancelModalOpen(true);
  };

  return (
    <div className="min-h-screen  text-foreground">
      <ScheduleAppointmentModal
        open={isScheduleModalOpen}
        onOpenChange={setIsScheduleModalOpen}
        appointmentId={selectedAppointmentId}
      />
      <CancelAppointmentModal
        open={isCancelModalOpen}
        onOpenChange={setIsCancelModalOpen}
        appointmentId={selectedAppointmentId}
      />
      {/* Header */}

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-foreground text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">
            Welcome back
          </h1>
          <p className="text-sm sm:text-base text-foreground">
            Here`s a summary of your recent and upcoming appointments.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
          {/* Upcoming Appointments Card */}
          <div className="bg-background rounded-lg p-4 sm:p-6 border border-[#363A3D]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-background rounded-lg">
                <CalendarCheck className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-blue-500">
                {stats.upcoming}
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                Upcoming appointments
              </p>
            </div>
          </div>

          {/* Missed Appointments Card */}
          <div className="bg-background rounded-lg p-4 sm:p-6 border border-[#363A3D]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-orange-500/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-orange-500">
                {stats.missed}
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                Missed appointments
              </p>
            </div>
          </div>

          {/* Completed Appointments Card */}
          <div className="bg-background rounded-lg p-4 sm:p-6 border border-[#363A3D]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-green-500/20 rounded-lg">
                <Check className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-green-500">
                {stats.completed}
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                Completed appointments
              </p>
            </div>
          </div>

          {/* Cancelled Appointments Card */}
          <div className="bg-background rounded-lg p-4 sm:p-6 border border-[#363A3D]">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-red-500/20 rounded-lg">
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-bold text-red-500">
                {stats.cancelled}
              </p>
              <p className="text-xs sm:text-sm text-foreground">
                Cancelled appointments
              </p>
            </div>
          </div>
        </div>

        <Button onClick={() => router.push("/appointments/create")} className="mb-5 flex justify-end">New Appointment</Button>
        {/* Appointments Table */}
        <div className="bg-background rounded-lg border border-[#363A3D] overflow-hidden">
          {/* Filter Section */}
          <div className="px-4 sm:px-6 py-4 border-b border-[#363A3D] flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold">Appointments</h2>
            <Select
              value={filterStatus}
              onValueChange={(value) =>
                setFilterStatus(value as AppointmentStatus)
              }
            >
              <SelectTrigger className="w-[180px] bg-background border-[#363A3D] text-foreground">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-background border-[#363A3D] text-foreground">
                <SelectItem
                  value="all"
                  className="focus:bg-background focus:text-foreground"
                >
                  All
                </SelectItem>
                <SelectItem
                  value="upcoming"
                  className="focus:bg-background focus:text-foreground"
                >
                  Upcoming
                </SelectItem>
                <SelectItem
                  value="missed"
                  className="focus:bg-background focus:text-foreground"
                >
                  Missed
                </SelectItem>
                <SelectItem
                  value="completed"
                  className="focus:bg-background focus:text-foreground"
                >
                  Completed
                </SelectItem>
                <SelectItem
                  value="cancelled"
                  className="focus:bg-background focus:text-foreground"
                >
                  Cancelled
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[640px] sm:min-w-full">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#363A3D] hover:bg-transparent">
                    <TableHead className="text-foreground font-medium min-w-[100px]">
                      Date
                    </TableHead>
                    <TableHead className="text-foreground font-medium min-w-[120px]">
                      Status
                    </TableHead>
                    <TableHead className="text-foreground font-medium min-w-[150px]">
                      Doctor
                    </TableHead>
                    <TableHead className="text-foreground font-medium min-w-[120px]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id} className="border-[#363A3D]">
                      <TableCell className="min-w-[100px]">
                        <span className="text-sm sm:text-base text-foreground whitespace-nowrap">
                          {appointment.date}
                        </span>
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <div className="flex items-center gap-2">
                          {appointment.status === "upcoming" && (
                            <Clock className="h-4 w-4 text-blue-500 shrink-0" />
                          )}
                          {appointment.status === "missed" && (
                            <AlertTriangle className="h-4 w-4 text-orange-500 shrink-0" />
                          )}
                          {appointment.status === "completed" && (
                            <Check className="h-4 w-4 text-green-500 shrink-0" />
                          )}
                          {appointment.status === "cancelled" && (
                            <X className="h-4 w-4 text-red-500 shrink-0" />
                          )}
                          <span
                            className={`text-sm sm:text-base ${appointment.statusColor} whitespace-nowrap capitalize`}
                          >
                            {appointment.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="min-w-[150px]">
                        <div className="flex items-center gap-2 sm:gap-3">
                          {/* {appointment.doctor.avatar ? (
                            <Avatar
                              src={appointment.doctor.avatar}
                              alt={appointment.doctor.name}
                              size="sm"
                              className="bg-gray-600 shrink-0"
                            />
                          ) : (
                            <Avatar
                              initials={appointment.doctor.initials}
                              className={`bg-gray-600 text-foreground shrink-0`}
                              size="sm"
                            />
                          )} */}
                          <Avatar
                            initials={appointment.doctor.initials}
                            className={`bg-gray-400 text-foreground shrink-0`}
                            size="sm"
                          />
                          <span className="text-sm sm:text-base text-foreground whitespace-nowrap">
                            {appointment.doctor.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <div className="flex items-center gap-2 sm:gap-3">
                          {/* <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleScheduleClick(appointment.id)}
                            className="text-green-500 hover:text-green-400 hover:bg-green-500/10 h-auto p-0 text-xs sm:text-sm whitespace-nowrap"
                          >
                            Reschedule
                          </Button> */}
                          {appointment.status === "upcoming" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCancelClick(appointment.id)}
                              className="text-foreground hover:text-foreground hover:bg-transparent h-auto p-0 text-xs sm:text-sm whitespace-nowrap"
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {filteredAppointments.length === 0 && (
            <div className="px-4 sm:px-6 py-8 text-center">
              <p className="text-foreground text-sm sm:text-base">
                No appointments found for the selected filter.
              </p>
            </div>
          )}

          {/* Pagination */}
          <div className="px-4 sm:px-6 py-4 border-t border-[#363A3D] flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:text-foreground hover:bg-transparent disabled:opacity-50"
              disabled
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-transparent"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppointmentsPage;
