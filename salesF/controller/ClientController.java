package com.example.sales.controller;

import com.example.sales.Mapper.ClientMapper;
import com.example.sales.dto.ClientDTO;
import com.example.sales.model.Client;
import com.example.sales.repository.ClientRepository;
import com.example.sales.repository.RouteRepository;
import com.example.sales.repository.ClientTypeRepository;
import com.example.sales.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController

@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ClientService clientService;

    @PostMapping
    public ResponseEntity<ClientDTO> createClient(@RequestBody ClientDTO dto) {
        Client client = ClientMapper.toEntity(dto);
        Client saved = clientService.createClient(client, dto.getClientTypeId(), dto.getRouteId());
        return ResponseEntity.ok(ClientMapper.toDTO(saved));
    }


    @GetMapping
    public ResponseEntity<List<ClientDTO>> getAllClients() {
        List<Client> clients = clientService.getAllClients();
        List<ClientDTO> dtos = clients.stream()
                .map(ClientMapper::toDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> getClientById(@PathVariable Long id) {
        return clientService.getClientById(id)
                .map(ClientMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientDTO> updateClient(@PathVariable Long id, @RequestBody ClientDTO dto) {
        try {
            Client updatedEntity = clientService.updateClient(id, ClientMapper.toEntity(dto));
            return ResponseEntity.ok(ClientMapper.toDTO(updatedEntity));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}
