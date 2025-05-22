package com.example.sales.service;

import com.example.sales.model.Client;
import com.example.sales.model.Route;
import com.example.sales.model.ClientType;
import com.example.sales.repository.ClientRepository;
import com.example.sales.repository.RouteRepository;
import com.example.sales.repository.ClientTypeRepository;  // corrigé ici

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private ClientTypeRepository clientTypeRepository; // ajouté

    public Client createClient(Client client, Long clientTypeId, Long routeId) {
        ClientType clientType = clientTypeRepository.findById(clientTypeId)
                .orElseThrow(() -> new IllegalArgumentException("ClientType not found with id: " + clientTypeId));
        client.setClientType(clientType);

        if (routeId != null) {
            Route route = routeRepository.findById(routeId)
                    .orElseThrow(() -> new IllegalArgumentException("Route not found with id: " + routeId));
            client.setRoute(route);
        } else {
            client.setRoute(null);
        }

        return clientRepository.save(client);
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Optional<Client> getClientById(Long id) {
        return clientRepository.findById(id);
    }

    public Client updateClient(Long id, Client updatedClient) {
        return clientRepository.findById(id)
                .map(client -> {
                    client.setName(updatedClient.getName());

                    // Met à jour ClientType
                    if (updatedClient.getClientType() != null) {
                        Long clientTypeId = updatedClient.getClientType().getId();
                        ClientType clientType = clientTypeRepository.findById(clientTypeId)
                                .orElseThrow(() -> new IllegalArgumentException("ClientType not found with id: " + clientTypeId));
                        client.setClientType(clientType);
                    } else {
                        client.setClientType(null);
                    }

                    // Met à jour Route
                    if (updatedClient.getRoute() != null) {
                        Long routeId = updatedClient.getRoute().getId();
                        Route route = routeRepository.findById(routeId)
                                .orElseThrow(() -> new IllegalArgumentException("Route not found with id: " + routeId));
                        client.setRoute(route);
                    } else {
                        client.setRoute(null);
                    }

                    return clientRepository.save(client);
                })
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
    }

    public void deleteClient(Long id) {
        if (!clientRepository.existsById(id)) {
            throw new RuntimeException("Client not found with id: " + id);
        }
        clientRepository.deleteById(id);
    }
}
