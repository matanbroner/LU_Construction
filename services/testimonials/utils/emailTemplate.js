
const createTemplate = (estimate) => { 
    console.log(estimate)
    let name = estimate.name
    let constructionType = estimate.constructionType
    let body = estimate.body
    let email = estimate.email
    let date = estimate.date

    var htmlBody = "<h3>LU Construction Estimate Request</h3><br/>"
    htmlBody += "<p><strong>Date:</strong> " + date + "</p></br>"
    htmlBody += "<p><strong>Customer Name</strong>: " + name + "</p></br>"
    htmlBody += "<p><strong>Customer Email</strong>: " + email + "</p></br>"
    htmlBody += "<p><strong>Project Type:</strong> " + constructionType + "</p></br>"
    htmlBody += "<p><strong>Body:<strong/> " + body + "</p></br>"

    return htmlBody
}

module.exports = createTemplate