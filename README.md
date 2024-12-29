# NEMSCAF CLI Tool

**NEMSCAF (Node Express MongoDB)** is a Command Line Interface (CLI) tool designed to scaffold **Node.js**, **Express**, and **MongoDB** projects efficiently. This tool allows developers to generate a boilerplate project with customizable features like **authentication** and **data validation**, ensuring a faster and standardized development process.

---

## Features

- **Quick Setup:** Generate a fully functional project with just one command.
- **Customizable Authentication:** Choose between JWT (default) or PassportJS for user authentication.
- **Validation Options:** Integrate Joi for request data validation to sanitize and structure user input.
- **Modular and Scalable Codebase:** The boilerplate is designed with clean, modular, and scalable architecture.

---

## Installation

To install the CLI globally, run:

```bash
npm install -g nemscaf
```

---

## Usage

After installation, you can use the `nemscaf` command to create and manage projects.

### General Command

```bash
nemscaf
```

Displays the general help and available commands:

```plaintext
Usage: nemscaf [options] [command]

A Command Line Interface (CLI) tool to scaffold Node.js, Express, and MongoDB projects with customizable boilerplate code for authentication and validation.

Options:
  -V, --version               output the version number
  -h, --help                  display help for command

Commands:
  create [options] <dirName>  Generate a new project with Node.js, Express, and MongoDB. Customize the project setup with additional options for authentication and validation.
  add <type> <name> [options] Add components like models, controllers, and routes to your project.
  help [command]              display help for command
```

### Create Command

The `create` command generates a new Node.js, Express, and MongoDB project.

#### Usage

```bash
nemscaf create [options] <dirName>
```

#### Arguments

| Argument  | Description                    |
| --------- | ------------------------------ |
| `dirName` | Name of the project directory. |

#### Options

| Option       | Description                                   |
| ------------ | --------------------------------------------- |
| `--passport` | Integrate PassportJS for user authentication. |
| `--joi`      | Include Joi for request data validation.      |
| `-h, --help` | Display help for the `create` command.        |

#### Examples

1. **Default Setup**  
   Without any options, the CLI sets up a project using JWT for authentication and excludes input validation.

   ```bash
   nemscaf create my-app
   ```

2. **With PassportJS Authentication**  
   Includes PassportJS for handling user authentication.

   ```bash
   nemscaf create my-app --passport
   ```

3. **With Joi Validation**  
   Adds Joi for request data validation.

   ```bash
   nemscaf create my-app --joi
   ```

4. **With Both PassportJS and Joi**  
   Combines PassportJS authentication with Joi validation.

   ```bash
   nemscaf create my-app --passport --joi
   ```

---

### Add Command

The `add` command is used to generate components such as models, controllers, and routes for your project.

#### Usage

```bash
nemscaf add <type> <name> [options]
```

#### Supported Types

1. **Models**
   Add a new model to the project.

   **Usage:**

   ```bash
   nemscaf add model <modelName> [attributes:dataTypes...]
   ```

   **Arguments**:

   | Argument               | Description                                            |
   | ---------------------- | ------------------------------------------------------ |
   | `modelName`            | Name of the model.                                     |
   | `attributes:dataTypes` | Schema attributes with Mongoose data types (optional). |

   **Example:**

   ```bash
   nemscaf add model Product name:String price:Number available:Boolean
   ```

   If no attributes are given in the command then it will generate an empty schema which users can define by itself.

2. **Controllers**
   Add a new controller for a specific model.

   **Usage:**

   ```bash
   nemscaf add controller <modelName> [actions...]
   ```

   **Arguments**:

   | Argument    | Description                                                      |
   | ----------- | ---------------------------------------------------------------- |
   | `modelName` | Name of the model for which the controller will be created.      |
   | `actions`   | Actions to define in the controller (e.g., `:create`, `:index`). |

   **Supported Actions:**

   | Action     | Description                              |
   | ---------- | ---------------------------------------- |
   | `:create`  | Creates a new record in the database.    |
   | `:index`   | Retrieves all records from the database. |
   | `:show`    | Retrieves a single record by its ID.     |
   | `:update`  | Updates an existing record.              |
   | `:destroy` | Deletes a specific record by its ID.     |

   **Example:**

   ```bash
   nemscaf add controller Product :create :index :update :destroy
   ```

   This command generates a controller for an already defined model in the project. Additionally, if a user needs to add specific actions to an existing controller, they can do so by specifying the required actions within the same command.

3. **Routes**
   Add a new route for a specific controller.

   **Usage:**

   ```bash
   nemscaf add route <controllerName> [actions...]
   ```

   **Arguments**:

   | Argument         | Description                                                                     |
   | ---------------- | ------------------------------------------------------------------------------- |
   | `controllerName` | Name of the controller for which the routes will be generated.                  |
   | `actions`        | Actions to define in the routes as an api endpoints (e.g., `:create`, `:index`) |

   **Example:**

   ```bash
   nemscaf add route Product :create :index :show
   ```

   This command generates routes for HTTP methods like GET, POST, and DELETE, linking them to the appropriate controller actions. If no actions are provided it will geenrate the endpoints on the already defined actions inside the controller.

---

### Scaffold Command

The `scaffold` command is used to generate the model, controller and routes for the given attributes. It will generate all the CRUD endpoints.

#### Usage

```bash
nemscaf scaffold <modelName> <attributes:dataTypes>
```

**Arguments**:

| Argument               | Description                                 |
| ---------------------- | ------------------------------------------- |
| `modelName`            | Name of the model.                          |
| `attributes:dataTypes` | Schema attributes with Mongoose data types. |

**Example:**

```bash
nemscaf scaffold Product name:String price:Number available:Boolean
```

---

## Project Structure

The generated project includes the following structure:

```
my-app/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── utils/
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

### Key Files and Directories

- **`src/controllers`**: Handles the logic for each route.
- **`src/middlewares`**: Middleware functions for authentication, validation, etc.
- **`src/models`**: Mongoose schemas and models for MongoDB.
- **`src/routes`**: Route definitions for the API.
- **`src/utils`**: Utility functions (e.g., token generation, error handling).

---

## Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/bharatraj1508/nemscaf/issues) or submit a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

Developed by **[Bharat Raj Verma](https://github.com/bharatraj1508)**.
