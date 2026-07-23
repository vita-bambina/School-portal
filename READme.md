# School portal backend 

# PRD: Product Description
The School Management Portal is a centralized digital platform designed to manage school operations and academic activities. The system provides a platform where students, aspirants, lecturers, and school administrators can interact with school services digitally.

The platform will simplify school administration processes by allowing users to manage admissions, enrollments, payments, courses, academic results, staff activities, and other school-related operations.

The system will reduce manual processes, improve communication between students, lecturers, and administrators, and provide a transparent way to manage school information.

# Users 
The School Management Portal is designed to serve four primary user groups, each with specific roles and responsibilities within the institution. Every user interacts with the system through a role-based dashboard that provides access only to the features and information relevant to their responsibilities. This approach ensures a secure, organized, and efficient experience while supporting the day-to-day academic and administrative operations of the institution.


#School Administrator:
The School Administrator has the highest level of access and is responsible for overseeing the overall management of the institution through the platform. Administrators manage users, academic structures, and operational activities to ensure the smooth running of the school

# Roles the School Administration Plays :

#1. User Management
The School Administrator can:
Add students.
Remove or withdraw students.
Delete student accounts.
Manage lecturer accounts.
Monitor all users.

#2. Academic Structure Management
The  School administrator can create, update, view, and delete:
Faculties.
Departments.
Courses.
Levels.
Academic sessions.

#3. Student Management
The  School administrator can:
View student information.
Monitor student enrollment.
Check student clearance status.
Track fee payments.
Manage student academic records.

#4. Lecturer Management
The School administrator can:
Add lecturers.
Assign lecturers to departments.
Assign courses to lecturers.
Update lecturer information.

#Lecturers
Lecturers are academic staff members responsible for delivering courses and supporting students throughout the academic session. Through their dedicated dashboard, they can manage their assigned courses, share learning resources, and carry out academic responsibilities relevant to their departments.

Lecturers can:
Log in to their lecturer dashboard.
View assigned departments.
View assigned courses.
Upload course materials and lecture slides.
Manage course information.
View students enrolled in their courses.
Perform other academic-related tasks.


#Students
Students are officially registered members of the institution who use the portal to manage their academic and financial activities. Through their personalized dashboard, they can access important academic information, monitor their progress, make payments, and interact with resources provided by their lecturers throughout their studies.

Students can:
Log in to their student portal.
Register courses.
Make school fee payments.
View payment history.
View academic results.
Check clearance status.
Access uploaded learning materials.

#Aspirants 
Aspirants are prospective students who use the platform to begin their journey into the institution. Through the portal, they can create an account, complete the enrollment process, and upload the necessary documents required by the school.

Aspirants can:
Create accounts.
Complete the enrollment process.
Upload required admission documents.


# Authentication System:
The system implements a secure authentication and authorization mechanism to ensure that only authorized users can access protected resources. Every user is assigned a specific role, and access to features is controlled based on their permissions.

The authentication system supports:
Secure user login.
JWT-based authentication.
Role-based access control.
Protected API endpoints.
Secure password storage using hashing.

#user Roles
School-Admin
Lecturer
Student
Each role has access only to the features and resources required to perform its responsibilities within the system.

# Faculty Management
The Faculty Management module allows the School Administrator to organize the institution into major academic divisions known as faculties. Faculties serve as the highest academic structure under which departments are organized.

The School Administrator can:
Create faculties.
View all faculties.
Update faculty information.
Delete faculties.

#Business Rules
A faculty can contain multiple departments.
Every faculty must have a unique name.
Only School Administrators can manage faculties.

# Department Management
The Department Management module allows the School Administrator to create and manage the academic departments within each faculty. Departments serve as the foundation of the institution's academic structure, grouping students, lecturers, courses, and academic levels under their respective fields of study. This module ensures that every department is properly organized and linked to the appropriate faculty.

The School Administrator can:
Create departments.
View all departments.
Update department information.
Delete departments.
Assign departments to faculties.

Business Rules
Every department must belong to a faculty.
A department cannot exist without an associated faculty.
Only School Administrators can create, update, or delete departments.
The system must verify that the selected faculty exists before creating a department.

# Level Management
The Level Management module allows the School Administrator to define and manage the academic levels available within each department. Different departments may have different numbers of levels depending on the duration of their academic programmes. For example, some departments may have four levels (100–400 Level), while others may have five or six levels.

The School Administrator can:
Create academic levels.
Specify the number of levels for each department.
View all levels.
Update level information.
Delete levels.
Assign levels to departments.

Business Rules
Every level must belong to a department.
Only School Administrators can create, update, or delete levels.
The number of levels available is determined by the academic structure of the department.
Students can only be assigned to levels that exist within their department.

# Course Management
The Course Management module enables the institution to organize and manage all academic courses offered across different departments. Courses are created and maintained by the School Administrator and are assigned to their respective departments. Lecturers are responsible for teaching the courses assigned to them during an academic session.

The School Administrator can:
Create courses.
View all courses.
Update course information.
Delete courses.
Assign courses to departments.
Assign courses to lecturers.

Lecturers can:
View assigned courses.
Upload course materials and lecture slides.
Manage course-related information.

Business Rules
Every course must belong to a department.
A course can only be assigned to an existing department.
Only School Administrators can create, update, or delete courses.
Lecturers can only manage courses assigned to them.

# Problem Statement
Many educational institutions still rely on manual or disconnected systems to manage academic and administrative activities. This often results in inefficient processes, difficulty accessing information, poor record management, and delays in communication between students, lecturers, and administrators.
Students may struggle to access academic records, make fee payments, or obtain learning materials, while lecturers may lack a centralized platform for managing courses and sharing educational resources. School administrators also face challenges in managing student records, monitoring fee payments, overseeing academic structures, and coordinating institutional operations.
The School Management Portal aims to address these challenges by providing a centralized, secure, and user-friendly platform that streamlines academic and administrative processes for all stakeholders.

# Goals And Objectives 
The primary goal of the School Management Portal is to digitize and simplify the management of academic and administrative activities within the institution.

The objectives of the system are to:

Provide a centralized platform for managing school information.

Simplify administrative processes for school administrators.

Enable students to conveniently access academic and financial services.

Provide lecturers with tools to effectively manage courses and learning materials.

Improve communication between students, lecturers, and administrators.

Reduce paperwork and manual record keeping.

Improve the accuracy, security, and accessibility of institutional data.

Enhance the overall efficiency of school operations.