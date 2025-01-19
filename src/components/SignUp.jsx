import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const SignUp = () => {

    const {createUser} = useContext(AuthContext);

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        createUser(email, password)
        .then(result => {
            console.log(result.user);
            // new user has been creted
            const createdAt = result.user?.metadata?.creationTime;
            const user = {email, createdAt: createdAt};
            fetch('http://localhost:5000/user', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    console.log('user added successfully')
                }
            })
        })
        .catch(error => {
            console.error(error)
        })

    }

    return (
        <div className="hero bg-base-200 min-h-screen">
  <div>
    <div className="text-center">
      <h1 className="text-5xl font-bold">SignUp now!</h1>
    </div>
    <div className="card bg-base-100 mt-10 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">SignUp</button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

export default SignUp;