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
          name: 'generator',
          message: 'What do you want to generate?',
          choices: [
            'Component',
            'Modifier',
            'Decorator',
            'Preview',
            'Template'
          ]
        }, {
          type: 'input',
          name: 'modifier',
          message: 'What\'s the name of the Modifier you want to add?',
          when: (answers) => answers.generator === 'Modifier'
        }, {
          type: 'input',
          name: 'decorator',
          message: 'What\'s the name of the Decorator you want to add?',
          when: (answers) => answers.generator === 'Decorator'
        }, {
          type: 'input',
          name: 'template',
          message: 'What\'s the name of the Template you want to add?',
          when: (answers) => answers.generator === 'Template'
        }, {
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
      this.generator = answers.generator.toLowerCase()
      this.name = firstToLower(answers.name)
      this.type = answers.type.toLowerCase()
      this.types = `${this.type}s`
      this.typeShort = answers.type.charAt(0).toLowerCase()
      const camelAndKebabName = getCamelAndKebabCase(this.name)
      this.nameCamel = camelAndKebabName.camel
      this.name = camelAndKebabName.kebab
      this.Name = firstToUpper(this.nameCamel)

      if (answers.modifier) {
        this.modifier = firstToLower(answers.modifier)
        const camelAndKebabSkin = getCamelAndKebabCase(this.modifier)
        this.modifierCamel = camelAndKebabSkin.camel
        this.modifier = camelAndKebabSkin.kebab
        this.Modifier = firstToUpper(this.modifierCamel)
      }

      if (answers.decorator) {
        this.decorator = firstToLower(answers.decorator)
        const camelAndKebabSkin = getCamelAndKebabCase(this.decorator)
        this.decoratorCamel = camelAndKebabSkin.camel
        this.decorator = camelAndKebabSkin.kebab
        this.Decorator = firstToUpper(this.decoratorCamel)
      }

      if (answers.template) {
        this.template = firstToLower(answers.template)
        const camelAndKebabSkin = getCamelAndKebabCase(this.template)
        this.templateCamel = camelAndKebabSkin.camel
        this.template = camelAndKebabSkin.kebab
        this.Template = firstToUpper(this.templateCamel)
      }
    })
  }

  writing () {
    let path = this.templatePath(this.generator)

    // Check if local template folder is available
    if (require('./package.json').name !== 'generator-terrific' && fs.existsSync(this.destinationPath('templates'))) {
      path = this.destinationPath('templates')
    }

    const files = glob.sync('**/*', {
      cwd: path,
      nodir: true
    })

    files.forEach((file) => {
      let newFile = file

      newFile = newFile.replace(/NAME/g, this.name)
      newFile = newFile.replace(/TYPE/g, this.types)
      newFile = newFile.replace(/MODIFIER/g, this.modifier)
      newFile = newFile.replace(/DECORATOR/g, this.decorator)
      newFile = newFile.replace(/TEMPLATE/g, this.template)

      this.fs.copyTpl(
        this.templatePath(`${this.generator}/${file}`),
        this.destinationPath(`${newFile}`),
        {
          name: this.name,
          Name: this.Name,
          modifier: this.modifier,
          Modifier: this.Modifier,
          decorator: this.decorator,
          Decorator: this.Decorator,
          template: this.template,
          Template: this.Template,
          type: this.type,
          types: this.types,
          typeShort: this.typeShort
        }
      )
    })
  }
}
