// import { useState, useEffect } from 'react'
// import retrieveEmployee from '../logic/retrieveEmployee.js'
// import isLoggedIn from '../logic/isLoggedIn.js'
// import Container from '../library/Container.jsx'
// import Me from '../components/Me.jsx'




export default function Home() {

    return <div>
        <div className="home">
            {/* /* sidebar lateral */}
            <header className="home-header">
                <h1 className="">b-Elevenz</h1>

                <img src="icon" />
                <h3 className="">Welcome!</h3>


                <h5 className=""><a href="">Go to company profile</a></h5>
                <p className="MyProfile-Me"><a href="" className="me" >Me</a></p>
                <p className=""><a href="" >Check my payroll</a></p>

            </header>
            <main>
                <h5 className=""><a href="">COMPANY PROFILE</a></h5>
                <p className=""><a href="">Employees</a></p>
                <p className=""> <a href="">Check absences</a></p>
                <p className=""> <a href="">Check Offices Reservations</a></p>


            </main>
        </div>

    </div>

}