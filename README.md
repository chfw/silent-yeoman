# silent-yeoman [![Build Status](https://travis-ci.org/chfw/silent-yeoman.svg?branch=master)](https://travis-ci.org/chfw/silent-yeoman)

This package is targetted at yeoman generator developers and you must have your generator source code checked out.

## Obtain it

```bash
npm install syo -g
```

## Develop it

```bash
git clone http://github.com/chfw/silient-yeoman.git
npm install . -g
```


## Usage

Suppose your generator had this prompt:

```
  var prompts = [
    {
      type: 'input',
      name: 'yourPromptName',
      message: 'Can this option be silent?',
      default: 'yes'
    }
    ...
  ]
```

Here the command line to launch your generator in **one line**:

```bash
 syo path_to_your_generator -yourPromptName yes ..
```

