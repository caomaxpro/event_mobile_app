const User = require('../models/User')

// Get user data
exports.getUserData = async (req, res) => {
  try {
    // console.log(req.body)

    const user = await User.findById(req.user.id).select("-password") // req.user.id will come from the authentication middleware

    console.log(user)

    if (!user) {
      return res.status(404).json({message: 'User not found'})
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({message: 'Server error'})
  }
}

exports.updateUserRole = async (req, res) => {
  try {
    const {user_id, new_role} = req.body

    // Ensure only admins can change roles
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({message: 'Only admins can change user roles'})
    }

    const user = await User.findByIdAndUpdate(
      user_id,
      {role: new_role},
      {new: true},
    )

    if (!user) {
      return res.status(404).json({message: 'User not found'})
    }

    res.status(200).json({message: 'User role updated successfully', user})
  } catch (error) {
    res.status(500).json({message: 'Server error', error: error.message})
  }
}
