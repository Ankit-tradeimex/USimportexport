const ContactMap = () => {
  return (
    <div className="h-[320px] w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10 sm:h-[400px] lg:h-[450px]">
      <iframe
        title="TradeImex office location on Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.3175847554717!2d77.1368446!3d28.71005349999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d071148ef8341%3A0xe55ab5577ff48f81!2sTradeImex%20-%20Global%20Trade%20Import%20Export%20Data%20Provider!5e0!3m2!1sen!2sin!4v1795002795865!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};

export default ContactMap;
