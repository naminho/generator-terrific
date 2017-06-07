const Generator = require('yeoman-generator')
const glob = require('glob')
const fs = require('fs')

const firstToLower = (str) => str.charAt(0).toLowerCase() + str.slice(1)
const firstToUpper = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const getCamelAndKebabCase = (str) => {
  const result = {}

  if (str.match(/-/g)) {
    result.camel = str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    result.kebab = str
  } else if (str.match(/[A-Z]/g)) {
    result.camel = str
    result.kebab = str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  } else {
    result.camel = str
    result.kebab = str
  }

  return result
}

module.exports = class extends Generator {
  prompting () {
    return this.prompt(
      [
        {
          type: 'list',
          name: 'template',
          message: 'What do you want to generate?',
          choices: [
            'Component',
            'Skin',
            'Decorator',
            'Preview'
          ]
        },
        {
          type: 'input',
          name: 'skin',
          message: 'What\'s the name of the Skin/Decorator?',
          when: (answers) => answers.template === 'Skin' || answers.template === 'Decorator'
        },
        {
          type: 'input',
          name: 'name',
          message: 'What\'s the name of the component?',
          default: 'text-image'
        }, {
          type: 'list',
          name: 'type',
          message: 'What type of component?',
          choices: [
            'Atom',
            'Molecule',
            'Organism'
          ]
        }
      ]
    ).then((answers) => {
      this.template = answers.template.toLowerCase()
      this.name = firstToLower(answers.name)
      this.type = answers.type.toLowerCase()
      this.types = `${this.type}s`
      this.typeShort = answers.type.charAt(0).toLowerCase()
      const camelAndKebabName = getCamelAndKebabCase(this.name)
      this.nameCamel = camelAndKebabName.camel
      this.name = camelAndKebabName.kebab
      this.Name = firstToUpper(this.nameCamel)

      if (answers.skin) {
        this.skin = firstToLower(answers.skin)
        const camelAndKebabSkin = getCamelAndKebabCase(this.skin)
        this.skinCamel = camelAndKebabSkin.camel
        this.skin = camelAndKebabSkin.kebab
        this.Skin = firstToUpper(this.skinCamel)
      }
    })
  }

  writing () {
    let path = this.templatePath(this.template)

    // Check if local templates are available
    if (fs.existsSync(this.destinationPath('templates'))) {
      path = this.destinationPath('templates')
    }

    const files = glob.sync('**/*', {
      cwd: path,
      nodir: true
    })

    files.forEach((file) => {
      let newFile = file

      newFile = newFile.replace(/name/g, this.name)
      newFile = newFile.replace(/type/g, this.types)
      newFile = newFile.replace(/skin/g, this.skin)

      this.fs.copyTpl(
        this.templatePath(`${this.template}/${file}`),
        this.destinationPath(`${newFile}`),
        {
          name: this.name,
          Name: this.Name,
          skin: this.skin,
          Skin: this.Skin,
          type: this.type,
          types: this.types,
          typeShort: this.typeShort
        }
      )
    })
  }
}
