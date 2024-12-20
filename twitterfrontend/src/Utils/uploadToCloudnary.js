export const uploadToCloudnary = async (pics) => {

    if(pics) {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "Twitter");
        data.append("cloud_name", "da2y5lnkd");

        const res = await fetch("https://api.cloudinary.com/v1_1/da2y5lnkd/image/upload" , {
            method:"post",
            body:data
        })

        const fileData = await res.json();

        return fileData.url.toString();

    }

    else console.log("Error from File Upload function")


}