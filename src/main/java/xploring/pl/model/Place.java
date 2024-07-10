package xploring.pl.model;

import jakarta.persistence.*;

@Entity
@Table(name = "places")
public class Place {
    //

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "place_name", nullable = false)
    private String name;

    @Column(name = "mainpictureurl", nullable = false)
    private String mainpictureurl;

    @Column(name = "xy", nullable = false)
    private String xy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMainpictureurl() {
        return mainpictureurl;
    }

    public void setMainpictureurl(String mainpictureurl) {
        this.mainpictureurl = mainpictureurl;
    }

    public String getXy() {
        return xy;
    }

    public void setXy(String xy) {
        this.xy = xy;
    }

    public String debug(){
        return id + ", " + name + ", " + mainpictureurl + ", " + xy;
    }
}
