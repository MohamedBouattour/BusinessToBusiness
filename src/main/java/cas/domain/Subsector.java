package cas.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Subsector.
 */
@Entity
@Table(name = "subsector")
public class Subsector implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("subsectors")
    private Sector sector;

    @OneToMany(mappedBy = "subsector")
    private Set<Business> businesses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Subsector name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Sector getSector() {
        return sector;
    }

    public Subsector sector(Sector sector) {
        this.sector = sector;
        return this;
    }

    public void setSector(Sector sector) {
        this.sector = sector;
    }

    public Set<Business> getBusinesses() {
        return businesses;
    }

    public Subsector businesses(Set<Business> businesses) {
        this.businesses = businesses;
        return this;
    }

    public Subsector addBusiness(Business business) {
        this.businesses.add(business);
        business.setSubsector(this);
        return this;
    }

    public Subsector removeBusiness(Business business) {
        this.businesses.remove(business);
        business.setSubsector(null);
        return this;
    }

    public void setBusinesses(Set<Business> businesses) {
        this.businesses = businesses;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Subsector)) {
            return false;
        }
        return id != null && id.equals(((Subsector) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Subsector{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
