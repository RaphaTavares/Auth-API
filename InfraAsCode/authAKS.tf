resource "azurerm_kubernetes_cluster" "example" {
  name                = "nodeauthaks"
  location            = data.azurerm_resource_group.pandora_box.location
  resource_group_name = data.azurerm_resource_group.pandora_box.name
  dns_prefix          = "nodeauthaks"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_DS2_v2"
  }

  service_principal {
    client_id = "89dd567d-42ce-4248-82a1-f7e9218b24a1"
    client_secret = "yNdu38rhDZ1NcrCUKTGDP3f1_lsYE.mI-6"
  }

  tags = {
    Environment = "Production"
  }
}

output "client_certificate" {
  value = azurerm_kubernetes_cluster.example.kube_config.0.client_certificate
}

output "kube_config" {
  value = azurerm_kubernetes_cluster.example.kube_config_raw

  sensitive = true
}