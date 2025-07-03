import React from 'react'
import { useState } from "react";
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOnboarding } from '../lib/api';

import {
  CameraIcon,
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
} from "lucide-react";


//for different languages
import { LANGUAGES } from "../constants";

//toast from react-hot-toast dependency
//define toast in import
import toast from 'react-hot-toast';

const OnBoardingPage = () => {
  
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",  //the name represent here which was in database firstly
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  //A mutation is typically used for POST, PUT, PATCH, DELETE requests — anything that causes a change in the backend.
    
    const { mutate:onboardingMutation , isPending, error } = useMutation({
      mutationFn: completeOnboarding,
      onSuccess: () =>{
        toast.success("Profile onboarded successfully")
        queryClient.invalidateQueries({queryKey: ["authUser"]});
      },
      onError: (error) => {
      toast.error(error.response.data.message);
      },
 
    });


  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  }
  // for random avatar in  profile pic
  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center px-4 py-8" data-theme="forest">
  <div className="card w-full max-w-3xl shadow-2xl bg-white rounded-3xl overflow-hidden">
    <div className="card-body p-8">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-2">Welcome to Vibely 🌍</h2>
      <p className="text-center text-gray-500 text-base mb-6">
        Let the world know who you are — get matched with language partners and make real connections.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-4">
          <div className="size-32 rounded-full border-4 border-green-400 shadow-lg overflow-hidden bg-gray-100">
            {formState.profilePic ? (
              <img
                src={formState.profilePic}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <CameraIcon className="size-12 text-gray-400 opacity-50" />
              </div>
            )}
          </div>
          <button type="button" onClick={handleRandomAvatar} className="btn btn-outline btn-success">
            <ShuffleIcon className="size-4 mr-2" /> Generate Random Avatar
          </button>
        </div>

        {/* Full Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formState.fullName}
            onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
            className="input input-bordered input-success w-full"
            placeholder="Your full name"
          />
        </div>

        {/* Bio */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Bio</span>
          </label>
          <textarea
            name="bio"
            value={formState.bio}
            onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
            className="textarea textarea-success textarea-bordered h-24"
            placeholder="Tell others about yourself and your language learning goals"
          />
        </div>

        {/* Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Native Language</span>
            </label>
            <select
              name="nativeLanguage"
              value={formState.nativeLanguage}
              onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
              className="select select-success select-bordered w-full"
            >
              <option value="">Select your native language</option>
              {LANGUAGES.map((lang) => (
                <option key={`native-${lang}`} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Learning Language</span>
            </label>
            <select
              name="learningLanguage"
              value={formState.learningLanguage}
              onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
              className="select select-success select-bordered w-full"
            >
              <option value="">Select language you're learning</option>
              {LANGUAGES.map((lang) => (
                <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <div className="relative">
            <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-green-400" />
            <input
              type="text"
              name="location"
              value={formState.location}
              onChange={(e) => setFormState({ ...formState, location: e.target.value })}
              className="input input-success input-bordered w-full pl-10"
              placeholder="City, Country"
            />
          </div>
        </div>

        {/* Submit */}
        <button className="btn btn-success w-full text-white shadow-md" disabled={isPending} type="submit">
          {!isPending ? (
            <>
              <ShipWheelIcon className="size-5 mr-2" /> Complete Onboarding
            </>
          ) : (
            <>
              <LoaderIcon className="animate-spin size-5 mr-2" /> Onboarding...
            </>
          )}
        </button>
      </form>
    </div>
  </div>
</div>

  )
}

export default OnBoardingPage
