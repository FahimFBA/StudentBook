# StudentBook

The only social media you need for your education and career needs.

![Login page](img/login.png)

## :raising_hand: What is StudentBook
StudentBook is a revamped social media platform for educational institutions. It is a web application that allows students, faculty, alumni, and staff to connect and collaborate in a secure and exclusive environment. StudentBook is a one-stop solution for all your educational and career needs. It is a platform where you can share your thoughts, ideas, and resources with your peers. You can also host virtual classrooms, seminars, and workshops using the integrated video conferencing tools (using [Calendly](https://calendly.com/) for now). StudentBook also has a job portal where you can explore internship, part-time job, and full-time job opportunities. Employers can post job listings and connect with potential candidates directly through the platform. StudentBook is designed with a responsive and accessible user interface to cater to diverse user needs. It also has customizable user profiles to enhance user experience. StudentBook is a centralized repository for academic resources, including lecture notes, study materials, and research papers. It has search and filtering options to help users quickly find other users along with their CGPA (if they are students). StudentBook implements robust security measures to protect user data, including encryption and secure authentication. It also uses hashed password protection for enhanced security.

## :raising_hand: Project Show Festival (27 August 2023)

![Project Show Festival](img/project_show.jpg)

## :computer: Technologies Used
* FrontEnd
    * React
    * React Router
    * SCSS
    * Tailwind CSS
    * Axios
    * React Toastify
    * Material UI Icons
    * React Icons
    * Hero Icons

* BackEnd
    * Node.js
    * Express.js
    * MySQL
    * Bcrypt
    * Cors
    * Multer
    * Moment
    * Express Validator
    * Express Async Handler

## :man_technologist: Installation

- Clone the repository `git clone https://github.com/FahimFBA/StudentBook.git`
- Go to the project directory `cd StudentBook`
- Go to the api directory `cd api`
- Install the dependencies `npm ci`
- Go to the client directory `cd client`
- Install the dependencies `npm ci`
- Import the database to your MySQL server from [schema](/schema/) directory. I suggest to use the MySQL Workbench for this.
- Modify the schema by adding the root password. Use `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';`
- Run the backend server. For this, go to the api directory `cd api` and run `npm start`
- Run the frontend server. For this, go to the client directory `cd client` and run `npm run dev`
- It will open the application in your browser. If not, go to [http://localhost:5173](http://localhost:5173). Make sure to go the Login page by adding `/login` at the end of the URL if that does not happen automatically (For presenting the project, I might have disabled the prtected route then.). It would be [http://localhost:5173/login](http://localhost:5173/login) in that case.
- Login with the test users given below.
- Enjoy!

<details>
<summary>:memo: Test Users' Credentials</summary>
<br>
   :student: Student <br> Student 1 <br>
    Username: Jane <br> Password: 1212 <br>
    Student 2 <br>
    Username: R2 <br> Password: 1212 <br>
    Student 3 <br>
    Username: Mou <br> Password: 1212 <br> <br>
    :woman_teacher: Faculty <br>
    Username: Israt <br> Password: 1212 <br> <br>
    :office_worker: Staff<br> 
    Username: Anisul <br> Password: 1212
</details>

## :eyes: Team Members (Team Ragnarok)
* Md. Fahim Bin Amin (Team Leader)
* Israt Jahan Khan (Database Designer)
* Sadia Afrin Mou (Database Designer and Poster Designer)
* Abtahi Arifeen (As Extra Supportive Member)

## :feather: Project Features
1. Connectivity for Unique Educational Social Media:
   * Create a secure and exclusive social media platform tailored to the specific 
educational institution.
    * Implement user authentication mechanisms to ensure only valid students, 
faculty, alumni, and staff can access the platform.
    * Foster a sense of community by providing a dedicated space for students, 
    faculty, alumni, and staff to interact and collaborate.
2. Sharing Posts and Resources
    * Enable users to create, share, and engage with posts, articles, 
announcements, and educational resources.
    * Facilitate discussions, comments, and likes on posts to encourage 
    meaningful interactions.
3. Online Meetings and Seminars
    * Integrate video conferencing tools to host virtual classrooms, seminars, 
    workshops, and meetings.
4. Official Job Portal
    * Develop a job portal where students can explore internships, part-time jobs, 
    and full-time job opportunities.
    * Allow employers to post job listings and connect with potential candidates 
    directly through the platform.
5. Accessibility and Unique User Features
    * Design the platform with a responsive and accessible user interface to cater to diverse user needs.'
    * Implement customizable user profiles to enhance user experience.
6. Learning Resources Repository
    * Create a centralized repository for academic resources, including lecture 
    notes, study materials, and research papers.
    * Implement search and filtering options to help users quickly find other users along with their CGPA (if they are students).
7. Security and Privacy Measures
    * Implement robust security measures to protect user data, including 
    encryption and secure authentication. 
    * Using hashed password protection for enhanced security.
  
By incorporating these features, the StudentBook project aims to create an all-inclusive educational social platform that enriches the academic experience and fosters a sense of community within the educational institution.


## :desktop_computer: ERD

<details>
<summary>:computer_mouse: Click here!</summary>
<br>
<img src="img/ERD.jpg" alt="ERD" width="1000"/>
</details>


## :man_technologist: Schema
<details>
<summary>:computer_mouse: Click here!</summary>
<br>
<img src="img/Schema.png" alt="ERD" width="1000"/>
</details>


## :video_camera: Video Demonstration
[Video demonstration on YouTube](https://www.youtube.com/watch?v=Cl4YKiA0Maw)

## :camera: Some Screenshots

### Login Page
![Login page](img/login.png)

### Register Page
![Register page](img/Register.png)

### Home Page
![Home page](img/HomeLong.png)

![Home Page 1](img/h1.png)

Did I forget to mention that we also have a dark mode? :smile:

![Home Page 2](img/h2.png)

### Profile Page
![Profile page](img/p1.png)

![Profile page](img/p2.png)

In dark mode!

![Profile page](img/p3.png)

### Article Page

In white mode!

![Article page](img/a1.png)

In dark mode!

![Article page](img/a2.png)

### Announcement Page

In white mode!

![Announcement page](img/an1.png)

In dark mode!

![Announcement page](img/an2.png)

### Job Page

In white mode!

![Job page](img/j1.png)

![Job page](img/j2.png)

In dark mode!

![Job page](img/j3.png)



## :page_with_curl: License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
