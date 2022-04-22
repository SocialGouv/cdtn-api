const initScript = `set -e
yarn cache:update
`;

module.exports = (manifests, values) => {
  console.log("values", values);
  for (const manifest of manifests) {
    if (manifest.kind === "Deployment" && manifest.metadata.name === "app") {
      manifest.spec.template.spec = {
        ...manifest.spec.template.spec,
        initContainers: [
          {
            name: "init",
            image: manifest.spec.template.spec.containers[0].image,
            env: [{ name: "REDIS_URL", value: "redis://redis:80" }],
            command: ["/bin/sh", "-c", initScript],
            ressources: manifest.spec.template.spec.containers[0].ressources,
          },
        ],
      };
    }
  }
  return manifests;
};
