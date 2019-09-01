package cas.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Sector.
 */
@Entity
@Table(name = "sector")
public class Sector implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "sector", fetch = FetchType.EAGER)
    private Set<Subsector> subsectors = new HashSet<>();

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

    public Sector name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Subsector> getSubsectors() {
        return subsectors;
    }

    public Sector subsectors(Set<Subsector> subsectors) {
        this.subsectors = subsectors;
        return this;
    }

    public Sector addSubsector(Subsector subsector) {
        this.subsectors.add(subsector);
        subsector.setSector(this);
        return this;
    }

    public Sector removeSubsector(Subsector subsector) {
        this.subsectors.remove(subsector);
        subsector.setSector(null);
        return this;
    }

    public void setSubsectors(Set<Subsector> subsectors) {
        this.subsectors = subsectors;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sector)) {
            return false;
        }
        return id != null && id.equals(((Sector) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Sector{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
