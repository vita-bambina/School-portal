import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DepartmentModule } from './department/department.module';
import { LevelModule } from './level/level.module';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';
import { LecturerModule } from './lecturer/lecturer.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { FacultyModule } from './faculty/faculty.module';
import { AspirantModule } from './aspirant/aspirant.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CourseMaterialModule } from './course-material/course-material.module';
import { AcademicSessionModule } from './academic-session/academic-session.module';
import { SemestersModule } from './semesters/semesters.module';

@Module({
  imports: [
    DepartmentModule,
    AuthModule,
    UserModule,
    LevelModule,
    CourseModule,
    StudentModule,
    LecturerModule,
    EnrollmentModule,
    FacultyModule,
    AspirantModule,
    CloudinaryModule,
    CourseMaterialModule,
    AcademicSessionModule,
    SemestersModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule {}
