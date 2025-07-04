import {
  LEAVE_CONTENT,
  LEAVE_STATUS,
  LEAVE_TYPES,
  StatusBadge,
  useGetAllRequests,
  useGetRemotesRequests,
  useUpdateRequest,
} from "@/entities/attendance";

import { calculateDays } from "@/shared/lib/date";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export function LeaveRequests() {
  const { data } = useGetAllRequests();
  const { data: remoteRequests } = useGetRemotesRequests();
  const requests = data?.items || [];
  const remotes = remoteRequests?.items || [];
  const { mutate: updateRequest, isPending } = useUpdateRequest();

  return (
    <div className="space-y-6">
      {/* Filter by request type */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All requests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All requests</SelectItem>
              <SelectItem value="remote">Remote work</SelectItem>
              <SelectItem value="leave">Leave</SelectItem>
              <SelectItem value="sick">Sick leave</SelectItem>
              <SelectItem value="overtime">Overtime</SelectItem>
              <SelectItem value="schedule">Schedule adjustment</SelectItem>
              <SelectItem value="attendance">Attendance correction</SelectItem>
            </SelectContent>
          </Select>
          <Badge className="bg-red-100 text-red-800">12 new requests</Badge>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            Approve all
          </Button>
        </div>
      </div>

      <div className="gap-6 grid lg:grid-cols-2">
        {/* Remote Work Requests */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              🏠 <span>Remote Work</span>
              <Badge className="bg-blue-100 text-blue-800">5 requests</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {remotes.map((remote, index) => (
              <div
                key={index}
                className="hover:bg-blue-50 p-3 border border-gray-200 rounded-lg transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="flex-shrink-0 w-10 h-10">
                    <AvatarFallback>
                      {remote.employee.lastName.split(" ").pop()?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 text-sm truncate">
                        {remote.employee.firstName} {remote.employee.lastName}
                      </h4>
                      <Badge
                        variant="outline"
                        className="flex-shrink-0 text-xs"
                      >
                        {remote.employee.department.name}
                      </Badge>
                      <StatusBadge status={remote.status} />
                    </div>
                    <p className="mb-1 text-gray-600 text-xs">
                      {calculateDays(remote.startDate, remote.endDate)} days (
                      {new Date(remote.startDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                      })}
                      -
                      {new Date(remote.endDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                      )
                    </p>
                    <p className="bg-gray-50 mb-2 p-2 rounded text-gray-700 text-xs line-clamp-2">
                      {remote.reason}
                    </p>
                    {remote.status === LEAVE_STATUS.PENDING && (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 px-2 h-7 text-white text-xs"
                          disabled={isPending}
                          onClick={() =>
                            updateRequest({
                              requestId: remote.id,
                              status: LEAVE_STATUS.APPROVED,
                              leaveType: LEAVE_TYPES.REMOTE,
                            })
                          }
                        >
                          ✓
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-red-50 px-2 border-red-600 h-7 text-red-600 text-xs"
                          disabled={isPending}
                          onClick={() =>
                            updateRequest({
                              requestId: remote.id,
                              status: LEAVE_STATUS.APPROVED,
                              leaveType: LEAVE_TYPES.REMOTE,
                            })
                          }
                        >
                          ✗
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Leave Requests */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              😴 <span>Leave Requests</span>
              <Badge className="bg-orange-100 text-orange-800">
                4 requests
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {requests?.map((request, index) => (
              <div
                key={index}
                className="hover:bg-orange-50 p-3 border border-gray-200 rounded-lg transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="flex-shrink-0 w-10 h-10">
                    <AvatarFallback>
                      {request.employee.lastName.split(" ").pop()?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 text-sm truncate">
                        {request.employee.firstName} {request.employee.lastName}
                      </h4>
                      <Badge
                        variant="outline"
                        className="flex-shrink-0 text-xs"
                      >
                        {request.employee.department.name}
                      </Badge>
                      <StatusBadge status={request.status} />
                    </div>
                    <p className="mb-1 text-gray-600 text-xs">
                      {LEAVE_CONTENT[request.leaveType]} -{" "}
                      {calculateDays(request.startDate, request.endDate)} days (
                      {new Date(request.startDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                      })}
                      -
                      {new Date(request.endDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                      )
                    </p>
                    <p className="bg-gray-50 mb-2 p-2 rounded text-gray-700 text-xs line-clamp-2">
                      {request.reason}
                    </p>
                    {request.status === LEAVE_STATUS.PENDING && (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 px-2 h-7 text-white text-xs"
                          disabled={isPending}
                          onClick={() =>
                            updateRequest({
                              requestId: request.id,
                              status: LEAVE_STATUS.APPROVED,
                            })
                          }
                        >
                          ✓
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-red-50 px-2 border-red-600 h-7 text-red-600 text-xs"
                          disabled={isPending}
                          onClick={() =>
                            updateRequest({
                              requestId: request.id,
                              status: LEAVE_STATUS.REJECTED,
                            })
                          }
                        >
                          ✗
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
