import { useLocation } from "react-router-dom";
import fk from '../assets/fk.jpg'
const Image = () => {
    const location = useLocation();
    const user = location.state?.user;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">User Profile</h1>

            {user ? (
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-center">
                    <p className="text-lg font-medium text-gray-700 dark:text-white">{user.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.studentId}</p>
                        <img
                            src={fk}
                            alt="User Profile"
                            className="mt-3 w-32 h-32 rounded-full border border-gray-300 dark:border-gray-600 shadow-md"
                        />
                </div>
            ) : (
                <p className="text-red-500 mt-4">No user data found</p>
            )}
        </div>
    );
};

export default Image;
