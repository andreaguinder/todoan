import styles from './ContainerLoading.module.scss';

const ContainerLoading = () => {


    return (

        <section className={styles.containerLoading}>
            <div className={styles.waveLoader}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>

    )

}

export { ContainerLoading };