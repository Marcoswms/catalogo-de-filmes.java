package br.com.marcos.catalogo_filmes.controller;

import br.com.marcos.catalogo_filmes.model.Filme;
import br.com.marcos.catalogo_filmes.service.FilmeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/filmes")
public class FilmeController {

    private final FilmeService service;

    public FilmeController(FilmeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Filme> listarTodos() {
        return service.listarTodos();
    }

    @PostMapping
    public Filme salvar(@RequestBody Filme filme) {
        return service.salvar(filme);
    }
}