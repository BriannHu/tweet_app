import React, {useEffect, useState} from 'react'
import {apiProfileDetail, apiProfileFollowToggle} from './lookup'
import {UserDisplay, UserPicture} from './components'

function ProfileBadge(props) {
    const {user, didFollowToggle, profileLoading} = props
    let currentVerb = (user && user.is_following) ? "Unfollow" : "Follow"
    currentVerb = profileLoading ? "Loading..." : currentVerb
    const handleFollowToggle = (event) => {
        event.preventDefault()
        if (didFollowToggle && !profileLoading) {
            didFollowToggle(currentVerb)
        }
    }
    return user ? <div>
        <UserPicture user={user} hideLink/>
        <p><UserDisplay user={user} includeFullName hideLink/></p>
        <button className='btn btn-primary' onClick={handleFollowToggle}>{currentVerb}</button>
        </div> : null
}

export function ProfileBadgeComponent(props) {
    const {username} = props
    const [didLookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)
    const handleBackendLookup = (response, status) => {
        console.log(response, status)
        if (status === 200) {
            setProfile(response)
        } 
    }
    useEffect(() => {
        if (didLookup === false) {
            apiProfileDetail(username, handleBackendLookup)
            setDidLookup(true)
        }
    }, [username, didLookup, setDidLookup])
    
    const handleNewFollow = (actionVerb) => {
        apiProfileFollowToggle(username, actionVerb, (response, status) => {
            console.log(response, status)
            if (status===200) {
                setProfile(response)
            }
            
            setProfileLoading(false)
        })
        setProfileLoading(true)
    }
    return didLookup === false ? "Loading..." : profile ? <ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading}/> : null
}