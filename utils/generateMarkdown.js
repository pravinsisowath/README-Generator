  
const generateMarkdown = data => {
  return `
<a href="${data.link}" style="float:right"><img src="${data.avatar}" alt="${data.name}" title="${data.name}" width="120" height="120"></a>
# ${data.title.toUpperCase()}
![License: ${(data.license) ? data.lic : 'None'}](https://img.shields.io/badge/License-${(data.lic) ? data.lic : 'None'}-brightgreen)
_Repo by ${data.name}_
__${data.description}__
__Installation:__
${data.installation}
__Usage:__
${data.usage}
__Contributors:__
${data.contributors}
__Tests:__
${data.test}
__Questions:__
${data.questions}
`
}

module.exports = generateMarkdown