import os

file_path = "services/api/app/main.py"
with open(file_path, "r") as f:
    content = f.read()

if "engines.router" not in content:
    content = content.replace(
        "app.include_router(routes.router, prefix=\"/api/v1/routes\", tags=[\"Routes\"])",
        "app.include_router(routes.router, prefix=\"/api/v1/routes\", tags=[\"Routes\"])\napp.include_router(engines.router, prefix=\"/api/v1/engines\", tags=[\"Engines\"])"
    )
    with open(file_path, "w") as f:
        f.write(content)
    print("Router added.")
else:
    print("Already there.")
