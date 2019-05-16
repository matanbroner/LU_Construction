
const createTemplate = (estimate) => { 
    let name = estimate.name
    let constructionType = estimate.projectType
    let body = estimate.description
    let email = estimate.email
    let date = formatDate()

    var htmlBody = "<h3>LU Construction Estimate Request</h3><br/>"
    htmlBody += "<p><strong>Date:</strong> " + date + "</p></br>"
    htmlBody += "<p><strong>Customer Name</strong>: " + name + "</p></br>"
    htmlBody += "<p><strong>Customer Email</strong>: " + email + "</p></br>"
    htmlBody += "<p><strong>Project Type:</strong> " + constructionType + "</p></br>"
    htmlBody += "<p><strong>Body:<strong/> " + body + "</p></br>"

    return htmlBody
}

const formatDate = () => {
    var m = new Date();
    var dateString =
    m.getUTCFullYear() + "/" +
    ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
    ("0" + m.getUTCDate()).slice(-2) + " " +
    ("0" + m.getUTCHours()).slice(-2) + ":" +
    ("0" + m.getUTCMinutes()).slice(-2) + ":" +
    ("0" + m.getUTCSeconds()).slice(-2);

    return dateString
}

module.exports = createTemplate