resource "azurerm_container_registry" "acr" {
  name                = "ContainerAuth"
  resource_group_name = data.azurerm_resource_group.pandora_box.name
  location            = data.azurerm_resource_group.pandora_box.location
  sku                 = "Standard"
  admin_enabled       = true
}