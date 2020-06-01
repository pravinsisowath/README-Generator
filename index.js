const prompt = require('inquirer').createPromptModule()
const fs = require('fs')

const api = require('./utils/api.js')
const generateMarkdown = require('./utils/generateMarkdown.js')

const writeToFile = (fileName, data) => {
  fs.writeFile(fileName + '.md', data, error => error ? console.error(error) : console.log(`${fileName + '.md'} generated!`))
}

const init = async _ => {
  let readme = {}
  do {
    const { username, repository } = await prompt([
      {
        type: 'input',
        name: 'user',
        message: 'GitHub user name?'
      },
      {
        type: 'input',
        name: 'repo',
        message: 'Repository name?'
      }
    ])
    readme = await api.getUser(username, repository)
    if (!readme) {
      console.error('Repo not found!')
    } else {
      console.log(`${readme.fullName} found!`)
    }
  } while (!readme)

  Object.assign(readme, await prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Project title?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description?'
    },
    {
      type: 'input',
      name: 'instructions',
      message: 'Instructions?'
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Usage?'
    },
    {
      type: 'input',
      name: 'license',
      message: 'License?'
    },
    {
      type: 'input',
      name: 'contributors',
      message: 'Contributors?'
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Tests?'
    },
    {
      type: 'input',
      name: 'questions',
      message: 'Questions?'
    }
  ]))
  writeToFile(readme.title, await generateMarkdown(readme))
}

init()