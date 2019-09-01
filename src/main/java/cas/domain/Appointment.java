package cas.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

import cas.domain.enumeration.EtatAppointment;

/**
 * A Appointment.
 */
@Entity
@Table(name = "appointment")
public class Appointment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @NotNull
    @Column(name = "time", nullable = false)
    private String time;

    @NotNull
    @Column(name = "location", nullable = false)
    private String location;

    @NotNull
    @Column(name = "num_table", nullable = false)
    private Integer numTable;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "etat", nullable = false)
    private EtatAppointment etat;

    @ManyToOne
    @JoinColumn(name="host_id")
    private Business host;

    @ManyToOne
    @JoinColumn(name="guest_id")
    private Business guest;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Appointment date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public Appointment time(String time) {
        this.time = time;
        return this;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getLocation() {
        return location;
    }

    public Appointment location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getNumTable() {
        return numTable;
    }

    public Appointment numTable(Integer numTable) {
        this.numTable = numTable;
        return this;
    }

    public void setNumTable(Integer numTable) {
        this.numTable = numTable;
    }

    public EtatAppointment getEtat() {
        return etat;
    }

    public Appointment etat(EtatAppointment etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(EtatAppointment etat) {
        this.etat = etat;
    }

    public Business getHost() {
        return host;
    }

    public Appointment host(Business host) {
        this.host = host;
        return this;
    }

    public void setHost(Business host) {
        this.host = host;
    }

    public Business getGuest() {
        return guest;
    }

    public Appointment guest(Business guest) {
        this.guest = guest;
        return this;
    }

    public void setGuest(Business guest) {
        this.guest = guest;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Appointment)) {
            return false;
        }
        return id != null && id.equals(((Appointment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Appointment{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", time='" + getTime() + "'" +
            ", location='" + getLocation() + "'" +
            ", numTable=" + getNumTable() +
            ", etat='" + getEtat() + "'" +
            ", host=" + getHost() +
            ", guest=" + getGuest() +
            "}";
    }
}
