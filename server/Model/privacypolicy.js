const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privacyPolicySchema = new Schema({
    privacy: {
        type: String,
      
    },
    intro: {
        type: String,
      
    },
    Note: {
        type: String,
    
    },
    sections: [
        {
            title: {
                type: String,
          
            },
            content: {
                type: String,
           
            },
            forms: [
                {
                    purpose: {
                        type: String,
               
                    },
                    details: {
                        type: String,
                  
                    },
                    legalBasis: {
                        type: String,
               
                    }
                }
            ]
        }
    ],
    cookiesSection: {
        title: {
            type: String,
      
        },

        Description: {
            type: String,
        },
        
        Note:{
            type: String,
        },

        cookies_section: [
            {
                title: {
                    type: String,
                
                },
                description: {
                    type: String,
               
                },
                cookies: [
                    {
                        tite: {
                            type: String,
                    
                        },
                        category: {
                            type: String,
                   
                        },
                        description_and_purpose: {
                            type: String,
                       
                        },
                        duration: {
                            type: String,
                        
                        }
                    }
                ]
            }
        ],
      
    }
},{
    timestamps: true
});

module.exports = mongoose.model('PrivacyPolicy', privacyPolicySchema);

