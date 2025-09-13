module Jekyll
  module ObsidianCallouts
    class CalloutProcessor
      def self.process(content)
        # Process Obsidian callout syntax
        content.gsub(/^> \[!(\w+)\]\s*(.*)$/) do |match|
          type = $1.downcase
          text = $2.strip
          
          # Map Obsidian callout types to CSS classes
          css_class = case type
          when 'info'
            'callout-info'
          when 'warning'
            'callout-warning'
          when 'error', 'danger'
            'callout-error'
          when 'success'
            'callout-success'
          when 'note'
            'callout-note'
          else
            'callout'
          end
          
          # Create HTML structure
          <<~HTML
            <div class="callout #{css_class}">
              <div class="callout-title">
                <span class="callout-icon"></span>
                #{type.capitalize}
              </div>
              <div class="callout-content">
                #{text}
              </div>
            </div>
          HTML
        end
      end
    end
  end
end

# Register the plugin
Jekyll::Hooks.register :posts, :pre_render do |post, payload|
  post.content = Jekyll::ObsidianCallouts::CalloutProcessor.process(post.content)
end

Jekyll::Hooks.register :pages, :pre_render do |page, payload|
  if page.data['layout'] == 'post'
    page.content = Jekyll::ObsidianCallouts::CalloutProcessor.process(page.content)
  end
end
