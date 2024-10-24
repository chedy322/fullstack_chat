const user=require('../module/user')
const Profile=require('../module/Profile')
const SocialLinks=require('../module/Activity')
const Education=require('../module/Education')

const get_all_users = async (req, res) => {
    try {
        const { username, mingrade, maxgrade, gender, country } = req.query;
        const filtering = {};
        
        // Username filtering (case-insensitive)
        if (username) {
            filtering.username = {
                $regex: '^' + username,
                $options: 'i'
            };
        }

        // Grade filtering
        if (mingrade || maxgrade) {
            filtering['education'] = {};
            if (maxgrade) {
                filtering['education.grade'].$lte = parseInt(maxgrade);
            }
            if (mingrade) {
                filtering['education.grade'].$gte = parseInt(mingrade);
            }
        }

        // Gender filtering
        if (gender) {
            filtering['profile.gender'] = gender;
        }

        // Country filtering
        if (country) {
            filtering['profile.country'] = country;
        }

        // Fetch users based on filtering, sort by creation date, and populate references
        const existing_user = await user.find(filtering).sort({ createdAt:  -1}).populate('socialLinks')
        .populate('education')
        .populate('profile');
        // {
        //     path:'education',
        //     // match:filtering['education']
        // }
        // {
        //     patch:'profile',
        //     // match:filtering['profile']
            
        // }
        // Respond with the filtered and sorted users
        res.status(201).json({ existing_user });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
};
// const get_all_users = async (req, res) => {
//     try {
//         const { username, mingrade, maxgrade, gender, country } = req.query;
        
//         // Initialize an empty filtering object
//         const filtering = {};
        
//         // Username filtering (case-insensitive)
//         if (username) {
//             filtering.username = {
//                 $regex: '^' + username,
//                 $options: 'i' // Case-insensitive
//             };
//         }

//         // Grade filtering based on the 'education' reference
//         if (mingrade || maxgrade) {
//             filtering['education'] = {};
//             if (maxgrade) {
//                 filtering['education.grade'] ={$lte: parseInt(maxgrade)};
//             }
//             if (mingrade) {
//                 filtering['education.grade'] = { ...filtering['education.grade'], $gte: parseInt(mingrade) };
//             }
//         }

//         // Gender filtering based on the 'profile' reference
//         if (gender) {
//             filtering['profile'] = { gender };
//         }

//         // Country filtering based on the 'profile' reference
//         if (country) {
//             filtering['profile'] = { ...filtering['profile'], country };
//         }

//         // Fetch users based on filtering, sort by creation date, and populate references
//         const existing_user = await user.find(filtering)
//             .sort({ createdAt: -1 }) // Sort by the most recent first
//             .populate('socialLinks')
//             .populate({
//                 path: 'education',
//                 match: filtering['education']
//             })
//             .populate({
//                 path: 'profile',
//                 match: filtering['profile']
//             });

//         // Respond with the filtered and sorted users
//         res.status(201).json({ existing_user });

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'An error occurred while fetching users.' });
//     }
// };

// here will return also all the informations for the specific user
const get_user_by_id=async (req,res)=>{
    try{
        const {id:user_id}=req.user
        const existing_user=await user.findOne({_id:user_id}).populate('profile')
        .populate('socialLinks')
        .populate('education');
        console.log(existing_user)
        if(!existing_user){
            return res.status(404).json({message:'user not found'})
        } 
        return res.status(201).json({existing_user})

    }catch(err){
        console.log(err)
    }
}
// filling all the data for the profile
const fill_data = async (req, res) => {
    try {
        const { id } = req.user;
        const { profile, socialLinks, education } = req.body;

        // Fetch the existing user
        const existingUser = await user.findById(id)
            .populate('profile')
            .populate('socialLinks')
            .populate('education');

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Validate that the user has the necessary references
        const newprofile= new Profile(profile)
        const savedprofile=await newprofile.save()

        const newsocial=new SocialLinks(socialLinks)
        const savedsocial=await newsocial.save()
        
        const neweducation=new Education(education)
        const savededucation=await neweducation.save()

        // Update the user document with the references to the updated documents
        const updatedUser = await user.findByIdAndUpdate(
            id,
            {
                profile: savedprofile._id,
                socialLinks: savedsocial._id,
                education: savededucation._id
            },
            { new: true }
        ).populate('profile').populate('socialLinks').populate('education');

        return res.status(201).json({ user: updatedUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while updating the user data" });
    }
};


// here will handle follow and unfollow 
const follow_user=async (req,res)=>{
    // will take the user id from the url when he click on his profile
    try{
        const {id:other_user}=req.params
        const {id:user_id}=req.user
        // if()
        const current_user=await user.findOne({_id:user_id}).select('following')
        console.log(current_user)
        const check_following=current_user.following.find(id=>id==other_user)
        if(check_following){
            // if he is already following then remove him from the following array
            const updated_user=await user.findByIdAndUpdate(user_id,{$pull:{following:other_user}},{
                new:true})
                return res.status(200).json({updated_user})
        }
        else{
            // if he not following him then will add him 
            const updated_user=await user.findByIdAndUpdate(user_id,{$push:{following:other_user}},{
                new:true})
            return res.status(200).json({updated_user})
        }
        // res.status(201).json({message:'users'})

    }catch(err){
        console.log(err)
    }
}
// }relative to the logged in should be in the other route
const delete_profile=async(req,res)=>{
    try{
        const existing_user=await user.findOne({_id:req.user.id})
        if(!existing_user){
            return res.status(404).json({message:'no existing user'})
        }
        await user.findOneAndDelete({_id:req.user.id})
        return res.status(200).json({message:'deleted'})

    }catch(err){
        console.log(err)
    }

}
module.exports={get_all_users,get_user_by_id,follow_user,fill_data,delete_profile}