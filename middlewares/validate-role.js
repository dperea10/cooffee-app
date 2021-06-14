const { response } = require('express');



const validateAdminRole = ( req, res = response, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            mgs: 'Role is invalid, is required role Admin'
        })
    }

    const { role, name } = req.user;
 
    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${name} in not adminstrator`
        })
    }

    next();
}

const getRoles = ( ...roles ) => {

    return (req, res = response, next ) => {

        if ( !req.user ) {
            return res.status(500).json({
                mgs: 'Role is invalid, is required role Admin'
            })
        }

        if ( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `The service require role valid!`
            })

        }

        next();
    }
}


module.exports = {
    validateAdminRole,
    getRoles
}
