import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AspirantService } from './aspirant.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { ApiTags, ApiResponse,ApiOperation } from '@nestjs/swagger';

@Controller('aspirant')
@UseGuards(JwtAuthGuard)
export class AspirantController {
  constructor(private readonly aspirantService: AspirantService) {}

  @ApiOperation({summary: "Get profile"})
  @Get('profile')
  @ApiResponse({status: 201, description:"profile gotten successfully"})
  getProfile(@Req() req) {
    return this.aspirantService.getProfile(req.user.id);
  }
  //
  // Get all faculties
   @ApiOperation({summary: "Get all faculties"})
  @Get('faculties')
   @ApiResponse({status: 201, description:"faculties gotten successfully"})
  getFaculties() {
    return this.aspirantService.getFaculties();
  }

  // Get departments under a faculty
  @ApiOperation({summary: "Get faculties by id"})
  @Get('faculties/:facultyId/departments')
   @ApiResponse({status: 201, description:"faculties gotten by Id successfully"})
  getDepartments(@Param('facultyId') facultyId: string) {
    return this.aspirantService.getDepartments(+facultyId);
  }

  // Get department requirements
  @Get('departments/:departmentId/requirements')
  getDepartmentRequirements(@Param('departmentId') departmentId: string) {
    return this.aspirantService.getDepartmentRequirements(+departmentId);
  }

  // Get my enrollment
  @Get('application')
  getMyApplication(@Req() req) {
    return this.aspirantService.getMyApplication(req.user.id);
  }

  // Get application status
  @Get('application/status')
  getApplicationStatus(@Req() req) {
    return this.aspirantService.getApplicationStatus(req.user.id);
  }

  // Get admission result
  @Get('admission-result')
  getAdmissionResult(@Req() req) {
    return this.aspirantService.getAdmissionResult(req.user.id);
  }
}
