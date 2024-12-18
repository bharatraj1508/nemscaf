const createActionDefinition = (actions, controllerName, schemaTypes) => {
  const actionDefinition = [];
  const actionExports = [];

  const dataTypes = Object.keys(schemaTypes).filter(
    (d) => d !== "_id" && d !== "__v"
  );

  actions.forEach((r) => {
    const action = r.replace(":", "");

    switch (action) {
      case "index":
        actionDefinition.push(
          `const all${controllerName} = async(req, res) => {

             try {
                const ${controllerName.toLowerCase()} = await ${controllerName}.find();
                res.status(200).send(${controllerName.toLowerCase()})

            } catch (err) {
                res.status(500).send({ error: err });
                }
            }\n`
        );
        actionExports.push(`all${controllerName}`);
        break;

      case "show":
        actionDefinition.push(
          `const single${controllerName} = async(req, res) => {
            const { id } = req.params

            try {
                const ${controllerName.toLowerCase()} = await ${controllerName}.findById(id);
                if (!product) {
                    return res.status(404).send({ message: '${controllerName} not found' });
                }
                res.status(200).send(${controllerName.toLowerCase()})

            } catch (err) {
                res.status(500).send({ error: err });
                }
            }\n`
        );
        actionExports.push(`single${controllerName}`);
        break;

      case "create":
        actionDefinition.push(
          `const create${controllerName} = async(req, res) => {

            const { ${dataTypes.join(", ")} } = req.body

            try {
                const ${controllerName.toLowerCase()} = await new ${controllerName}({${dataTypes.join(", ")}}).save();
                res.status(200).send({
                    success: true,
                    message: "${controllerName} created successfully",
                    ${controllerName.toLowerCase()}
                    });
                    
            } catch (err) {
                res.status(500).send({ error: err });
                }
            }\n`
        );
        actionExports.push(`create${controllerName}`);
        break;

      case "update":
        actionDefinition.push(
          `const update${controllerName} = async(req, res) => {
            const { ${dataTypes.join(", ")} } = req.body;
            const { id } = req.params;

            try {
                const ${controllerName.toLowerCase()} = await ${controllerName}.findByIdAndUpdate( id, { ${dataTypes.join(", ")} }, { new: true })

                if (!${controllerName.toLowerCase()}) {
                    return res.status(404).send({ message: "${controllerName} not found" });
                }

                res.status(200).send({
                    message: "${controllerName} updated successfully",
                    ${controllerName.toLowerCase()},
                });

            } catch (err) {
                res.status(500).send({ error: err });
                }
            }\n`
        );
        actionExports.push(`update${controllerName}`);
        break;

      case "destroy":
        actionDefinition.push(
          `const destroy${controllerName} = async(req, res) => {
            const { id } = req.params;
            try {
                    const ${controllerName.toLowerCase()} = await ${controllerName}.findByIdAndDelete(id);

                    if (!${controllerName.toLowerCase()}) {
                        return res.status(404).send({ message: "${controllerName} not found" });
                    }

                    res.status(200).send({
                        message: "${controllerName} deleted successfully",
                    });

                } catch (err) {
                    res.status(500).send({ error: err });
                }
            }\n`
        );
        actionExports.push(`destroy${controllerName}`);
        break;
    }
  });

  return { actionDefinition, actionExports };
};

module.exports = { createActionDefinition };
