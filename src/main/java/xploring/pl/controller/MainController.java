package xploring.pl.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import xploring.pl.exception.ResourceNotFoundException;
import xploring.pl.model.Place;
import xploring.pl.repository.PlaceRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MainController {
    @GetMapping("/")
    public ModelAndView defaultMapping() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("main");
        return modelAndView;
    }
    @GetMapping("/login")
    public ModelAndView login() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }
    @Autowired
    private PlaceRepository placeRepository;

    @GetMapping("/places")
    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    @PostMapping("/new")
    public Place createPlace(@RequestBody Place place) {
        return placeRepository.save(place);
    }

    @GetMapping("/{id}")
    public Place getPlaceById(@PathVariable Long id) {
        return placeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Place not found with id " + id));
    }

    @PutMapping("/{id}")
    public Place updatePlace(@PathVariable Long id, @RequestBody Place placeDetails) {
        Place place = placeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Place not found with id " + id));

        place.setName(placeDetails.getName());
        place.setMainpictureurl(placeDetails.getMainpictureurl());
        place.setXy(placeDetails.getXy());

        return placeRepository.save(place);
    }

    @DeleteMapping("/{id}")
    public void deletePlace(@PathVariable Long id) {
        Place place = placeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Place not found with id " + id));
        placeRepository.delete(place);
    }
    @GetMapping("/search")
    @ResponseBody
    public List<Place> search(@RequestParam String query) {
        List<Place> results = new ArrayList<>();
        results.addAll(placeRepository.findByNameContainingIgnoreCase(query));
        return results;
    }

}
