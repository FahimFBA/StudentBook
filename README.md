# StudentBook

The only social media you need for your education and career needs.

![Login page](img/login.png)

## :man_technologist: Installation

- Clone the repository `git clone https://github.com/FahimFBA/StudentBook.git`
- Go to the project directory `cd StudentBook`
- Go to the api directory `cd api`
- Install the dependencies `npm ci`
- Go to the client directory `cd client`
- Install the dependencies `npm ci`
- Import the database to your MySQL server from [schema](/schema/) directory. I suggest to use the MySQL Workbench for this.
- Run the backend server. For this, go to the api directory `cd api` and run `npm start`
- Run the frontend server. For this, go to the client directory `cd client` and run `npm run dev`
- It will open the application in your browser. If not, go to [http://localhost:5173](http://localhost:5173). Make sure to go the Login page by adding `/login` at the end of the URL if that does not happen automatically (For presenting the project, I might have disabled the prtected route then.). It would be [http://localhost:5173/login](http://localhost:5173/login) in that case.
- Login with the test users given below.
- Enjoy!

<details>
<summary>Test Users' Credentials</summary>
<br>
   :student: <br> Student 1 <br>
    Username: Jane <br> Password: 1212 <br>
    Student 2 <br>
    Username: R2 <br> Password: 1212
    Student 3 <br>
    Username: Mou <br> Password: 1212
    :woman_teacher: <br>
    Username: Israt <br> Password: 1212
    :office_worker: <br>
    Username: Anisul <br> Password: 1212
</details>
