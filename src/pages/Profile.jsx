import { useEffect, useState } from "react";

import { getProfile } from "../services/profileService";

function Profile()
{
    const [user, setUser] = useState(null);

    useEffect(() =>
    {
        fetchProfile();
    }, []);

    const fetchProfile = async () =>
    {
        try
        {
            const data = await getProfile();

            setUser(data);
        }
        catch(error)
        {
            console.log(error);
        }
    };

    if(!user)
    {
        return <h1>Loading...</h1>;
    }

    return (

        <div className="max-w-2xl mx-auto">

            <div className="bg-white shadow-lg rounded-2xl p-8">

                <h1 className="text-3xl font-bold mb-6 text-blue-600">
                    My Profile
                </h1>

                <div className="space-y-4">

                    <div>
                        <p className="text-gray-500">
                            Name
                        </p>

                        <h2 className="text-xl font-semibold">
                            {user.name}
                        </h2>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Email
                        </p>

                        <h2 className="text-xl font-semibold">
                            {user.email}
                        </h2>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Role
                        </p>

                        <h2 className="text-xl font-semibold">
                            {user.role}
                        </h2>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;