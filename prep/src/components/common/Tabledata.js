export const responseTable = ()=> [
    {
        name:"Id",
        selector:row=>row.id,
        sortable:true,
    },
    {
        name:"Full name",
        selector:row=>row.full_name,
        sortable:true,
    },
    {
        name:"Email",
        selector:row=>row.email,
        sortable:true,
    },
    {
        name:"Phone number",
        selector:row=>row.phone_number,
        sortable:true,
    },
    {
        name:"School name",
        selector:row=>row.school_name,
        sortable:true,
    },
    {
        name:"Location",
        selector:row=>row.location,
        sortable:true,
    },
    {
        name:"Selected option",
        selector:row=>row.selected_option_text,
        sortable:true,
    },
    {
        name:"Class type",
        selector:row=>row.class_type,
        sortable:true,
    }
]