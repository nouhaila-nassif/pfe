package com.example.sales.Mapper;

import com.example.sales.dto.ClientDTO;
import com.example.sales.model.Client;

public class ClientMapper {

    public static ClientDTO toDTO(Client client) {
        if (client == null) return null;

        ClientDTO dto = new ClientDTO();
        dto.setId(client.getId());
        dto.setName(client.getName());



        if (client.getRoute() != null) {
            dto.setRouteId(client.getRoute().getId());
        }

        return dto;
    }

    public static Client toEntity(ClientDTO dto) {
        if (dto == null) return null;
        Client client = new Client();
        client.setId(dto.getId());
        client.setName(dto.getName());
        // Ne pas gérer sellerType et route ici
        return client;
    }

}

