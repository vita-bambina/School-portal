import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AspirantService } from './aspirant.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';

@Controller('aspirant')
@UseGuards(JwtAuthGuard)
export class AspirantController {
  constructor(private readonly aspirantService: AspirantService) {}
  @Get('profile')
  getProfile(@Req() req) {
    return this.aspirantService.getProfile(req.user.id);
  }
  //
  // Get all faculties
  @Get('faculties')
  getFaculties() {
    return this.aspirantService.getFaculties();
  }

  // Get departments under a faculty
  @Get('faculties/:facultyId/departments')
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
