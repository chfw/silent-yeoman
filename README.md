# silent-yeoman - Speech is silver, silence is gold

This package is targetted at yeoman generator developers and you must have your generator source code checked out.

## Obtain it

 git clone http://github.com/chfw/silient-yeoman.git
 npm install . -g

## Usage

Suppose your generator had this prompt:

  var prompts = [
    {
      type: 'input',
      name: 'yourPromptName',
      message: 'Can this option be silent?',
      default: 'yes'
    }
    ...
  ]

Here the command line to launch your generator in **one line**:

 syo path_to_your_generator -yourPromptName yes ..


